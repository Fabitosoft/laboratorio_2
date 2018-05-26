from rest_framework import viewsets

from .api_serializers import CitologiaSerializer, BiopsiaSerializer
from .models import Citologia, Biopsia


class BiopsiaViewSet(viewsets.ModelViewSet):
    queryset = Biopsia.objects.select_related(
        'orden_examen',
        'orden_examen__examen',
    ).all()
    serializer_class = BiopsiaSerializer

    def perform_update(self, serializer):
        super().perform_update(serializer)
        biopsia = self.get_object()
        orden_examen = biopsia.orden_examen
        orden_examen.modificado_por = self.request.user
        if biopsia.descripcion_macroscopica and biopsia.diagnostico:
            orden_examen.resultado = "Con Resultado de Biopsia"
        else:
            orden_examen.resultado = None
        orden_examen.save()


class CitologiaViewSet(viewsets.ModelViewSet):
    queryset = Citologia.objects.select_related(
        'orden_examen',
        'orden_examen__examen',
    ).all()
    serializer_class = CitologiaSerializer

    def clear_A1_1(self, citologia):
        campo = citologia.A1_1
        if not campo:
            citologia.A1_1a = False
            citologia.A1_1b = False
            citologia.save()

    def clear_A1(self, citologia):
        campo = citologia.A1_1
        campo_dos = citologia.A1_2
        if not campo and not campo_dos:
            citologia.A1_i = False
            citologia.A1_ii = False
            citologia.A1_iii = False
            citologia.A1_iv = False
            citologia.A1_v = False
            citologia.A1_vi = False
            citologia.A1_vii = False
            citologia.save()

    def clear_A3(self, citologia):
        campo = citologia.A3
        if not campo:
            citologia.A3a = False
            citologia.A3b = False
            citologia.save()

    def perform_update(self, serializer):
        super().perform_update(serializer)
        citologia = self.get_object()
        examen = citologia.orden_examen
        campos = Citologia._meta.get_fields()
        respondidas_booleanas = 0
        self.clear_A1_1(citologia)
        self.clear_A1(citologia)
        self.clear_A3(citologia)
        for campo in campos:
            es_booleano = Citologia._meta.get_field(campo.name).get_internal_type() == 'BooleanField'
            if es_booleano:
                if hasattr(citologia, campo.name):
                    valor = getattr(citologia, campo.name)
                    if valor:
                        respondidas_booleanas += 1
        if respondidas_booleanas > 0:
            examen.resultado = 'Con resultados'
        else:
            examen.resultado = None
        examen.save()
