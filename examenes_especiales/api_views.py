from io import BytesIO

from django.db.models import Sum
from django.http import HttpResponse
from django.template.loader import get_template
from rest_framework import viewsets, permissions
from rest_framework.decorators import list_route
from weasyprint import CSS, HTML

from .api_serializers import CitologiaSerializer, BiopsiaSerializer
from .models import Citologia, Biopsia
from ordenes.mixins import OrdenesExamenesPDFViewMixin
from entidades.models import Entidad


class BiopsiaViewSet(OrdenesExamenesPDFViewMixin, viewsets.ModelViewSet):
    queryset = Biopsia.objects.select_related(
        'orden_examen',
        'orden_examen__examen',
    ).all()
    serializer_class = BiopsiaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        super().perform_update(serializer)
        biopsia = self.get_object()
        if biopsia.orden_examen.examen_estado == 2:
            self.generar_pdf_especiales(self.request, biopsia.orden_examen, biopsia.nro_examen_especial)
        elif biopsia.orden_examen.examen_estado in [0, 1]:
            orden_examen = biopsia.orden_examen
            orden_examen.modificado_por = self.request.user
            orden_examen.save()


class CitologiaViewSet(OrdenesExamenesPDFViewMixin, viewsets.ModelViewSet):
    queryset = Citologia.objects.select_related(
        'orden_examen',
        'orden_examen__examen',
    ).all()
    serializer_class = CitologiaSerializer
    permission_classes = [permissions.IsAuthenticated]

    @list_route(methods=['post'])
    def print_estadistica(self, request, pk=None):
        entidad_id = self.request.POST.get('entidad_id', None)
        fecha_ini = self.request.POST.get('fecha_ini')
        fecha_fin = self.request.POST.get('fecha_fin')
        entidad = None
        citologias = Citologia.objects.filter(
            orden_examen__orden__fecha_ingreso__date__lte=fecha_fin,
            orden_examen__orden__fecha_ingreso__date__gte=fecha_ini,
            orden_examen__examen_estado=2
        )

        if entidad_id:
            citologias = citologias.filter(orden_examen__orden__entidad_id=entidad_id)
            entidad = Entidad.objects.get(id=entidad_id)

        citologias_insactifactorias = citologias.filter(A1_2=True)
        citologias_negativas = citologias.filter(B1=True)
        citologias_ASC_US = citologias.filter(B2a=True)
        citologias_ASC_H = citologias.filter(B2b=True)
        citologias_LIE_BG_HPV = citologias.filter(B3=True)
        citologias_LIE_AG = citologias.filter(B4=True)
        citologias_carcinoma_escamoso = citologias.filter(B5=True)
        citologias_ACG = citologias.filter(B9=True)
        citologias_Adenocarcinoma_in_situ_e_invasivo = citologias.filter(B7=True)

        ctx = {
            'entidad': entidad,
            'fecha_ini': fecha_ini,
            'fecha_fin': fecha_fin,
            'cantidad': citologias.count(),
            'cantidad_insactifactorias': citologias_insactifactorias.count(),
            'cantidad_negativas': citologias_negativas.count(),
            'cantidad_ASC_US': citologias_ASC_US.count(),
            'cantidad_ASC_H': citologias_ASC_H.count(),
            'cantidad_LIE_BG_HPV': citologias_LIE_BG_HPV.count(),
            'cantidad_LIE_AG': citologias_LIE_AG.count(),
            'cantidad_carcinoma_escamoso': citologias_carcinoma_escamoso.count(),
            'cantidad_ACG': citologias_ACG.count(),
            'cantidad_Adenocarcinoma_in_situ_e_invasivo': citologias_Adenocarcinoma_in_situ_e_invasivo.count(),
        }
        html_get_template = get_template(
            'reportes/estadisticas/citologia_cervical/estadistica_citologia_cervical.html').render(ctx)

        html = HTML(
            string=html_get_template,
            base_url=request.build_absolute_uri()
        )

        main_doc = html.render(stylesheets=[CSS('static/css/pdf_ordenes_recibos.min.css')])

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

    def clearCampos(self, citologia, campos_array):
        campos = Citologia._meta.get_fields()
        for campo in campos:
            es_booleano = Citologia._meta.get_field(campo.name).get_internal_type() == 'BooleanField'
            if campo.name in campos_array and es_booleano:
                setattr(citologia, campo.name, False)
        citologia.save()

    def clear_A1_1(self, citologia):
        campo = citologia.A1_1
        if not campo:
            self.clearCampos(citologia, ['A1_1a', 'A1_1b'])

    def clear_A1(self, citologia):
        campo = citologia.A1_1
        campo_dos = citologia.A1_2
        if not campo and not campo_dos:
            self.clearCampos(citologia, ['A1_i', 'A1_ii', 'A1_iii', 'A1_iv', 'A1_iv', 'A1_v', 'A1_vi', 'A1_vii'])

    def clear_A3(self, citologia):
        campo = citologia.A3
        if not campo:
            self.clearCampos(citologia, ['A3a', 'A3b'])
        else:
            campos = Citologia._meta.get_fields()
            for campo in campos:
                es_booleano = Citologia._meta.get_field(campo.name).get_internal_type() == 'BooleanField'
                if campo.name not in ['A3a', 'A3b', 'A3'] and es_booleano:
                    setattr(citologia, campo.name, False)
            citologia.save()

    def clear_B1(self, citologia):
        campo = citologia.B1
        if not campo:
            self.clearCampos(citologia, ['B1a', 'B1b', 'B1c', 'B1d'])

    def clear_B1a(self, citologia):
        campo = citologia.B1
        campo_dos = citologia.B1a
        if not campo or not campo_dos:
            self.clearCampos(citologia, ['B1a_i', 'B1a_ii', 'B1a_iii', 'B1a_iv'])

    def clear_B2(self, citologia):
        campo = citologia.B2
        if not campo:
            self.clearCampos(citologia, ['B2a', 'B2b'])

    def clear_B3(self, citologia):
        campo = citologia.B3
        if not campo:
            self.clearCampos(citologia, ['B3a'])

    def clear_B6(self, citologia):
        campo = citologia.B6
        if not campo:
            self.clearCampos(citologia, ['B6a', 'B6a_i', 'B6a_ii'])

    def clear_B6a(self, citologia):
        campo = citologia.B6a
        if not campo:
            self.clearCampos(citologia, ['B6a_i', 'B6a_ii'])

    def clear_B8(self, citologia):
        campo = citologia.B8
        if not campo:
            self.clearCampos(citologia, ['B8a', 'B8b', 'B8c', 'B8d'])

    def perform_update(self, serializer):
        super().perform_update(serializer)
        citologia = self.get_object()
        examen = citologia.orden_examen
        if examen.examen_estado == 2:
            self.generar_pdf_especiales(self.request, examen, citologia.nro_examen_especial)
        elif citologia.orden_examen.examen_estado in [0, 1]:
            self.clear_A1_1(citologia)
            self.clear_A1(citologia)
            self.clear_A3(citologia)
            self.clear_B1a(citologia)
            self.clear_B1(citologia)
            self.clear_B2(citologia)
            self.clear_B3(citologia)
            self.clear_B6(citologia)
            self.clear_B6a(citologia)
            self.clear_B8(citologia)
            examen.save()
