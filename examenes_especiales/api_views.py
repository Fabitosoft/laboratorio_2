from rest_framework import viewsets, permissions

from .api_serializers import CitologiaSerializer, BiopsiaSerializer
from .models import Citologia, Biopsia


class BiopsiaViewSet(viewsets.ModelViewSet):
    queryset = Biopsia.objects.select_related(
        'orden_examen',
        'orden_examen__examen',
    ).all()
    serializer_class = BiopsiaSerializer
    permission_classes = [permissions.IsAuthenticated]

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
    permission_classes = [permissions.IsAuthenticated]

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
        campos = Citologia._meta.get_fields()
        respondidas_booleanas = 0
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

        for campo in campos:
            es_booleano = Citologia._meta.get_field(campo.name).get_internal_type() == 'BooleanField'
            if es_booleano:
                if hasattr(citologia, campo.name):
                    valor = getattr(citologia, campo.name)
                    if valor:
                        respondidas_booleanas += 1
        examen.save()
