import datetime
import random
from io import BytesIO

from PyPDF2.pdf import PageObject
from django.core.files import File
from django.core.mail import EmailMultiAlternatives
from django.db.models import Q, Max
from django.conf import settings

from django.http import HttpResponse
from django.template.loader import render_to_string
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response
from rest_framework import viewsets, serializers, permissions
from PyPDF2 import PdfFileMerger, PdfFileWriter, PdfFileReader

from ordenes.mixins import OrdenesPDFViewMixin, OrdenesExamenesPDFViewMixin
from .api_serializers import OrdenSerializer, OrdenExamenSerializer
from .models import Orden, OrdenExamen
from medicos.models import Especialista
from examenes_especiales.models import Biopsia, Citologia


class OrdenViewSet(OrdenesPDFViewMixin, viewsets.ModelViewSet):
    queryset = Orden.objects.select_related(
        'medico_remitente',
        'paciente',
        'entidad',
        'elaborado_por'
    ).all()
    serializer_class = OrdenSerializer
    permission_classes = [permissions.IsAuthenticated]

    @list_route(methods=['get'])
    def por_entidad(self, request):
        entidad_id = self.request.GET.get('entidad_id')
        qs = self.get_queryset().filter(estado=1, entidad_id=entidad_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @detail_route(methods=['post'])
    def enviar_email(self, request, pk=None):
        orden = self.get_object()
        tipo_envio = request.POST.get('tipo_envio')
        send_to = []
        con_contrasena = False
        no_enviados_email = orden.mis_examenes.filter(examen_estado=2, examen__no_email=True)
        especiales = orden.mis_examenes.filter(especial=True, examen_estado=2, examen__no_email=False)
        text_content = render_to_string(
            'email/ordenes/resultados/cuerpo_correo_paciente.html',
            {'no_enviados_email': no_enviados_email}
        )

        main_doc = self.generar_resultados_pdf(request, orden, es_email=True, es_entidad=False)

        if tipo_envio == 'Cliente':
            con_contrasena = True
            send_to.append(orden.paciente.email)

        if tipo_envio == 'Entidad':
            especiales = orden.mis_examenes.filter(especial=True, examen_estado=2)
            main_doc = self.generar_resultados_pdf(request, orden, es_email=True, es_entidad=True)
            text_content = render_to_string(
                'email/ordenes/resultados/cuerpo_correo_entidad.html', {'orden': orden}
            )
            contactos_entidad = orden.entidad.mis_contactos.filter(enviar_correo=True)
            if contactos_entidad.exists():
                send_to.extend(
                    [x.correo_electronico for x in orden.entidad.mis_contactos.filter(enviar_correo=True).distinct()])
            else:
                raise serializers.ValidationError('No tiene correos registrados para envío')

        output = BytesIO()
        pdf_merger = PdfFileMerger()
        pdf_writer = PdfFileWriter()
        if main_doc:
            main_doc.write_pdf(
                target=output
            )
            pdf_merger.append(output)

        msg = EmailMultiAlternatives(
            'Resultados orden %s - %s' % (orden.nro_orden, orden.paciente.full_name),
            text_content,
            bcc=['copias.laboratorio.collazos@gmail.com'],
            from_email='Laboratorios Collazos <%s>' % settings.RESULTADOS_FROM_EMAIL,
            to=send_to
        )
        msg.attach_alternative(text_content, "text/html")
        for exa in especiales.all():
            pdf_leido = PdfFileReader(exa.pdf_examen)
            if not pdf_leido.isEncrypted:
                pdf_merger.append(pdf_leido)
            else:
                msg.attach_file(exa.pdf_examen.path)
        pdf_merger.write(output)

        if con_contrasena:
            pdf_leido = PdfFileReader(output)
            pdf_writer.appendPagesFromReader(pdf_leido)
            nro_identificacion_paciente = orden.paciente.nro_identificacion
            pdf_writer.encrypt(
                user_pwd=nro_identificacion_paciente,
                owner_pwd='Cc%s' % nro_identificacion_paciente,
                use_128bit=True
            )
            pdf_writer.write(output)
        msg.attach('Resultados nro. orden %s.pdf' % orden.nro_orden, output.getvalue(), 'application/pdf')
        try:
            pass
            msg.send()
        except Exception as e:
            raise serializers.ValidationError(
                'Se há presentado un error al intentar enviar el correo, envío fallido: %s' % e)
        return Response({'resultado': 'ok'})

    @detail_route(methods=['post'], permission_classes=[permissions.AllowAny])
    def print_resultados(self, request, pk=None):
        return self.generar_pdf(request, True)

    @detail_route(methods=['post'])
    def print_resultados_sin_logo(self, request, pk=None):
        return self.generar_pdf(request)

    def generar_pdf(self, request, con_logo=False):
        orden = self.get_object()
        base = self.generar_base_pdf(request)
        output_base = BytesIO()
        # output_final = BytesIO()
        base.write_pdf(
            target=output_base
        )

        output_documento_estandares = BytesIO()
        output_documento_estandares_especiales = BytesIO()
        output_documento_con_fondo = BytesIO()
        output_final = BytesIO()

        resultados_estandar = self.generar_resultados_pdf(request, orden)
        if resultados_estandar:
            resultados_estandar.write_pdf(
                target=output_documento_estandares
            )

        pdf_merger = PdfFileMerger()
        pdf_estandares_reader = PdfFileReader(output_documento_estandares)
        pdf_merger.append(pdf_estandares_reader)

        # plantillas_especiales = orden.mis_examenes.filter(especial=True, nro_plantilla__isnull=False, examen_estado=2)
        plantillas_especiales = orden.mis_examenes.filter(especial=True, examen_estado=2)
        for exa in plantillas_especiales.all():
            pdf_examen = PdfFileReader(exa.pdf_examen)
            if not pdf_examen.isEncrypted:
                pdf_merger.append(pdf_examen)
        pdf_merger.write(output_documento_estandares_especiales)

        pdf_base_reader = PdfFileReader(output_base)  # La base de fondo
        pdf_documento_reader = PdfFileReader(output_documento_estandares_especiales)  # El pdf para poner fondo
        writer_con_fondo = PdfFileWriter()
        cantidad_hojas = pdf_documento_reader.getNumPages()

        # Aqui coloca encabezado y pie de página
        if con_logo:
            for nro_hora in range(cantidad_hojas):
                page_object_base = pdf_base_reader.getPage(0)
                page_object_documento = pdf_documento_reader.getPage(nro_hora)
                page_object_documento.mergePage(page_object_base)
                writer_con_fondo.addPage(page_object_documento)
            writer_con_fondo.write(output_documento_con_fondo)
        else:
            output_documento_con_fondo = output_documento_estandares_especiales

        # pdf_merger_final = PdfFileMerger()
        # pdf_merger_final.append(output_documento_con_fondo)
        # cargados = orden.mis_examenes.filter(especial=True, nro_plantilla__isnull=True, examen_estado=2)
        # for exa in cargados.all():
        #     pdf_examen = PdfFileReader(exa.pdf_examen)
        #     if not pdf_examen.isEncrypted:
        #         pdf_merger_final.append(pdf_examen)
        # pdf_merger_final.write(output_final)

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="somefilename.pdf"'
        response['Content-Transfer-Encoding'] = 'binary'
        response.write(output_documento_con_fondo.getvalue())
        return response

    @detail_route(methods=['post'])
    def print_recibo(self, request, pk=None):
        orden = self.get_object()
        main_doc = self.generar_recibo_pdf(request, orden)
        output = BytesIO()
        main_doc.write_pdf(
            target=output
        )
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="somefilename.pdf"'
        response['Content-Transfer-Encoding'] = 'binary'
        response.write(output.getvalue())
        output.close()
        return response

    @list_route(methods=['get'])
    def buscar_x_parametro(self, request):
        parametro = request.GET.get('parametro')
        qs = None
        if len(parametro) > 0:
            qs = self.get_queryset().filter(
                Q(paciente__nombre__icontains=parametro) |
                Q(paciente__nombre_segundo__icontains=parametro) |
                Q(paciente__apellido__icontains=parametro) |
                Q(paciente__apellido_segundo__icontains=parametro) |
                Q(paciente__nro_identificacion__icontains=parametro) |
                Q(id__icontains=parametro)
            ).distinct().order_by('-pk')
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(elaborado_por=self.request.user)

    def perform_update(self, serializer):
        orden = serializer.save()
        if orden.estado == 1:
            now = datetime.datetime.now()
            if not orden.nro_orden:
                base_nro = (abs(int(now.year)) % 100) * 10000
                qs = Orden.objects.filter(
                    nro_orden__isnull=False,
                    nro_orden__gte=base_nro
                ).aggregate(
                    ultimo_indice=Max('nro_orden')
                )
                ultimo_indice = qs['ultimo_indice']
                if ultimo_indice is None:
                    orden.nro_orden = base_nro
                else:
                    orden.nro_orden = int(ultimo_indice) + 1
            if not orden.codigo_consulta_web:
                orden.codigo_consulta_web = orden.generar_codigo_consulta_web()
            orden.save()
            qs = OrdenExamen.objects.filter(
                nro_examen__isnull=False,
            ).aggregate(
                ultimo_indice=Max('nro_examen')
            )
            base_nro_examen = (abs(int(now.year)) % 100) * 100000
            ultimo_indice_examen = qs.get('ultimo_indice')
            if not ultimo_indice_examen:
                ultimo_indice_examen = base_nro_examen

            mis_examenes = orden.mis_examenes

            for examen in mis_examenes.all():
                if not examen.nro_examen:
                    ultimo_indice_examen = ultimo_indice_examen + 1
                    examen.nro_examen = ultimo_indice_examen
                    examen.save()
                    examen.generar_nro_examen_especial()


class OrdenExamenViewSet(OrdenesExamenesPDFViewMixin, viewsets.ModelViewSet):
    queryset = OrdenExamen.objects.select_related(
        'orden',
        'orden__paciente',
        'examen__subgrupo_cups',
        'orden__entidad',
        'biopsia',
        'citologia',
        'examen'
    ).prefetch_related(
        # 'mis_bitacoras__generado_por',
        'mis_firmas__especialista',
        'mis_firmas__especialista__especialidad'
    ).all().order_by('pk')
    serializer_class = OrdenExamenSerializer
    permission_classes = [permissions.IsAuthenticated]

    @detail_route(methods=['post'])
    def upload_pdf_examen(self, request, pk=None):
        orden_examen = self.get_object()
        pdf_examen = self.request.FILES['pdf_examen']
        orden_examen.pdf_examen.delete()
        nombre_pdf = '%s_ALE%s.pdf' % (orden_examen.nro_examen, random.randint(1000, 9999))
        orden_examen.pdf_examen.save(nombre_pdf, File(pdf_examen))
        pdf_leido = PdfFileReader(orden_examen.pdf_examen)
        orden_examen.pdf_examen_encriptado = pdf_leido.isEncrypted
        orden_examen.save()
        if orden_examen.pdf_examen:
            orden_examen.examen_estado = 2
            orden_examen.save()
        serializer = self.get_serializer(orden_examen)
        return Response(serializer.data)

    @detail_route(methods=['post'])
    def eliminar_pdf_examen(self, request, pk=None):
        orden_examen = self.get_object()
        orden_examen.pdf_examen.delete()
        orden_examen.examen_estado = 0
        orden_examen.pdf_examen_encriptado = False
        orden_examen.save()
        serializer = self.get_serializer(self.get_object())
        return Response(serializer.data)

    @list_route(methods=['get'])
    def pendientes(self, request):
        qs = self.get_queryset().filter(orden__estado=1, examen_estado=0)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def por_entidad(self, request):
        entidad_id = self.request.GET.get('entidad_id')
        qs = self.get_queryset().filter(orden__estado=1, orden__entidad_id=entidad_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def con_resultados(self, request):
        qs = self.get_queryset().filter(orden__estado=1, examen_estado=1)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @list_route(methods=['get'], permission_classes=[permissions.AllowAny])
    def por_nro_orden_y_codigo_consulta_web(self, request):
        nro_identificacion = self.request.GET.get('nro_identificacion')
        codigo_consulta_web = self.request.GET.get('codigo_consulta_web')
        qs = self.get_queryset().filter(
            orden__estado=1,
            orden__paciente__nro_identificacion=nro_identificacion,
            orden__codigo_consulta_web=codigo_consulta_web,
            # examen__no_email=False
        )
        if qs.exists():
            serializer = self.get_serializer(qs, many=True)
            return Response(serializer.data)
        else:
            raise serializers.ValidationError(
                {'error': 'No se encontró coincidencia entre cédula y número de consulta de orden'})

    @list_route(methods=['get'])
    def verificados(self, request):
        qs = self.get_queryset().filter(orden__estado=1, examen_estado__in=[2, 3])
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def por_orden(self, request):
        orden_id = self.request.GET.get('orden_id')
        qs = self.get_queryset().filter(orden_id=orden_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @detail_route(methods=['post'])
    def firmar(self, request, pk=None):
        orden_examen = self.get_object()
        id_especialista = self.request.POST.get('id_especialista')
        especialista = None
        if not id_especialista:
            user = self.request.user
            if hasattr(user, 'especialista'):
                if hasattr(user.especialista, 'firma'):
                    especialista = user.especialista
        else:
            especialista = Especialista.objects.get(id=id_especialista)
        if especialista:
            orden_examen.firmar(especialista)
        serializer = self.get_serializer(self.get_object())
        return Response(serializer.data)

    @detail_route(methods=['post', 'get'])
    def quitar_firma(self, request, pk=None):
        id_firma = int(request.POST.get('id_firma'))
        orden_examen = self.get_object()
        firma = orden_examen.mis_firmas.filter(id=id_firma).all()
        firma.delete()
        serializer = self.get_serializer(self.get_object())
        return Response(serializer.data)

    def perform_create(self, serializer):
        orden_examen = serializer.save(creado_por=self.request.user)
        if orden_examen.especial:
            if orden_examen.nro_plantilla == 1:
                Biopsia.objects.create(orden_examen=orden_examen)
            if orden_examen.nro_plantilla == 2:
                Citologia.objects.create(orden_examen=orden_examen)

    def perform_update(self, serializer):
        super().perform_update(serializer)
        orden_examen = self.get_object()
        if orden_examen.examen_estado == 2:
            if not orden_examen.fecha_verificado:
                orden_examen.fecha_verificado = datetime.datetime.now()
        else:
            orden_examen.fecha_verificado = None

        if not orden_examen.especial and orden_examen.examen_estado == 2:
            self.generar_pdf(self.request, orden_examen)
        if orden_examen.especial and orden_examen.examen_estado == 2:
            self.generar_pdf_especiales(self.request, orden_examen, orden_examen.get_numero_examen_especial())
        if not orden_examen.especial and orden_examen.examen_estado != 2:
            orden_examen.pdf_examen.delete()
        if orden_examen.especial and orden_examen.nro_plantilla and orden_examen.examen_estado != 2:
            orden_examen.pdf_examen.delete()

    @detail_route(methods=['post'], permission_classes=[permissions.AllowAny, ])
    def print_resultados(self, request, pk=None):
        return self.generar_print_pdf(request, True)

    @detail_route(methods=['post'])
    def print_resultados_sin_logo(self, request, pk=None):
        return self.generar_print_pdf(request)

    def generar_print_pdf(self, request, con_logo=False):
        orden_examen = self.get_object()
        pdf_examen_reader = PdfFileReader(orden_examen.pdf_examen)
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="somefilename.pdf"'
        response['Content-Transfer-Encoding'] = 'binary'

        if not con_logo:
            pdf_examen_writer = PdfFileWriter()
            pdf_examen_writer.appendPagesFromReader(pdf_examen_reader)

            output_examen_sin_logo = BytesIO()
            pdf_examen_writer.write(output_examen_sin_logo)
            response.write(output_examen_sin_logo.getvalue())
            return response
        else:
            base = self.generar_base_pdf(request)
            output_base = BytesIO()
            output_final = BytesIO()
            base.write_pdf(
                target=output_base
            )

            cantidad_hojas = pdf_examen_reader.getNumPages()

            pdf_base_reader = PdfFileReader(output_base)  # La base de fondo
            writer_con_fondo = PdfFileWriter()

            for nro_hora in range(cantidad_hojas):
                page_object_base = pdf_base_reader.getPage(0)
                page_object_documento = pdf_examen_reader.getPage(nro_hora)
                page_object_documento.mergePage(page_object_base)
                writer_con_fondo.addPage(page_object_documento)
            writer_con_fondo.write(output_final)

            response.write(output_final.getvalue())
            return response
