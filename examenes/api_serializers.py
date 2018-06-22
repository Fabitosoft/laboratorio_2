from rest_framework import serializers

from .models import Examen, CupsGrupo, CupsSubGrupo


class CupsSubGrupoSerializer(serializers.ModelSerializer):
    grupo_cups_nombre = serializers.CharField(source='grupo.nombre', read_only=True)

    class Meta:
        model = CupsSubGrupo
        fields = [
            'id',
            'nombre',
            'grupo',
            'grupo_cups_nombre',
            'orden'
        ]


class CupsGrupoSerializer(serializers.ModelSerializer):
    mis_subgrupos = CupsSubGrupoSerializer(many=True, read_only=True)

    class Meta:
        model = CupsGrupo
        fields = [
            'id',
            'nombre',
            'orden',
            'mis_subgrupos'
        ]


class ExamenSerializer(serializers.ModelSerializer):
    subgrupo_cups_nombre = serializers.CharField(source='subgrupo_cups.nombre', read_only=True)
    grupo_cups = serializers.IntegerField(source='subgrupo_cups.grupo_id', read_only=True)
    grupo_cups_nombre = serializers.CharField(source='subgrupo_cups.grupo.nombre', read_only=True)

    class Meta:
        model = Examen
        fields = [
            'id',
            'codigo_cups',
            'no_email',
            'nombre',
            'nombre_corto',
            'valor_referencia',
            'unidad_medida',
            'tecnica',
            'costo_referencia',
            'grupo_cups',
            'grupo_cups_nombre',
            'subgrupo_cups',
            'subgrupo_cups_nombre',
            'multifirma',
            'especial',
            'nro_plantilla'
        ]
