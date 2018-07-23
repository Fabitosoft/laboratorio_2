import datetime
from io import BytesIO

from django.core.mail import EmailMultiAlternatives
from django.db.models import Q, Max
from django.conf import settings

from django.http import HttpResponse
from django.template.loader import render_to_string
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response
from rest_framework import viewsets, serializers, permissions
from PyPDF2 import PdfFileMerger

from ordenes.mixins import OrdenesPDFViewMixin
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

    @detail_route(methods=['post'])
    def enviar_email(self, request, pk=None):
        orden = self.get_object()
        tipo_envio = request.POST.get('tipo_envio')
        send_to = []
        if tipo_envio == 'Cliente':
            send_to.append(orden.paciente.email)

        if tipo_envio == 'Entidad':
            contactos_entidad = orden.entidad.mis_contactos.filter(enviar_correo=True)
            if contactos_entidad.exists():
                send_to.extend(
                    [x.correo_electronico for x in orden.entidad.mis_contactos.filter(enviar_correo=True).distinct()])
            else:
                raise serializers.ValidationError('No tiene correos registrados para envío')

        main_doc = self.generar_resultados_pdf(request, orden, es_email=True)

        text_content = render_to_string('email/ordenes/resultados/cuerpo_correo.html', {})

        output = BytesIO()
        pdf_merger = PdfFileMerger()
        if main_doc:
            main_doc.write_pdf(
                target=output
            )
            pdf_merger.append(output)

        msg = EmailMultiAlternatives(
            'Resultados de examenes',
            text_content,
            # bcc=['mylabcollazos@hotmail.com'],
            from_email='Laboratorios Collazos <%s>' % settings.RESULTADOS_FROM_EMAIL,
            to=send_to
        )
        msg.attach_alternative(text_content, "text/html")
        especiales = orden.mis_examenes.filter(especial=True, examen_estado=2, examen__no_email=False)
        for exa in especiales.all():
            pdf_merger.append(exa.pdf_examen.path)
            pdf_merger.write(output)
        msg.attach('Resultados %s' % orden.id, output.getvalue(), 'application/pdf')
        try:
            pass
            msg.send()
        except Exception as e:
            raise serializers.ValidationError(
                'Se há presentado un error al intentar enviar el correo, envío fallido: %s' % e)
        return Response({'resultado': 'ok'})

    @detail_route(methods=['post'])
    def print_resultados(self, request, pk=None):
        orden = self.get_object()
        main_doc = self.generar_resultados_pdf(request, orden)

        output = BytesIO()
        pdf_merger = PdfFileMerger()
        if main_doc:
            main_doc.write_pdf(
                target=output
            )
            pdf_merger.append(output)
        especiales = orden.mis_examenes.filter(especial=True, examen_estado=2)
        for exa in especiales.all():
            pdf_merger.append(exa.pdf_examen.path)
            pdf_merger.write(output)
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="somefilename.pdf"'
        response['Content-Transfer-Encoding'] = 'binary'
        response.write(output.getvalue())
        output.close()
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


class OrdenExamenViewSet(viewsets.ModelViewSet):
    queryset = OrdenExamen.objects.select_related(
        'orden',
        'orden__paciente',
        'examen__subgrupo_cups',
        'orden__entidad',
        'biopsia',
        'citologia'
    ).prefetch_related(
        # 'mis_bitacoras__generado_por',
        'mis_firmas__especialista',
        'mis_firmas__especialista__especialidad'
    ).all().order_by('pk')
    serializer_class = OrdenExamenSerializer
    permission_classes = [permissions.IsAuthenticated]

    @list_route(methods=['get'])
    def pendientes(self, request):
        qs = self.get_queryset().filter(orden__estado=1, examen_estado=0)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def con_resultados(self, request):
        qs = self.get_queryset().filter(orden__estado=1, examen_estado=1)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

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
