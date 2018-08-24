from rest_framework import serializers

from .models import Citologia, Biopsia


class BiopsiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Biopsia
        fields = [
            'id',
            'observaciones',
            'orden_examen',
            'nombre',
            'descripcion_macroscopica',
            'descripcion_microscopica',
            'diagnostico',
            'nro_examen_especial',
        ]


class CitologiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Citologia
        fields = [
            'id',
            'observaciones',
            'orden_examen',
            'nro_examen_especial',
            'A1_1',
            'A1_1a',
            'A1_1b',
            'A1_2',

            'A1_i',
            'A1_ii',
            'A1_iii',
            'A1_iv',
            'A1_v',
            'A1_vi',
            'A1_vii',

            'A3',
            'A3a',
            'A3b',

            'B1',
            'B1a',
            'B1a_i',
            'B1a_ii',
            'B1a_iii',
            'B1a_iv',

            'B1b',
            'B1c',
            'B1d',

            'B2',
            'B2a',
            'B2b',

            'B3',
            'B3a',
            'B4',
            'B5',

            'B6',
            'B6a',
            'B6a_i',
            'B6a_ii',

            'B7',
            'B8',
            'B8a',
            'B8b',
            'B8c',
            'B8d',

            'B9',

            'C1',
            'C2',
            'C3',
            'C4',
            'C5',
            'C6',
            'C7',
        ]
