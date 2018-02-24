from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from .models import Entidad, EntidadExamen, ContactoEntidad


class ContactoEntidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactoEntidad
        fields = [
            'id',
            'entidad',
            'nombre',
            'correo_electronico',
            'enviar_correo'
        ]


class EntidadExamenSerializer(serializers.ModelSerializer):
    examen_nombre = serializers.CharField(source='examen.nombre', read_only=True)
    examen_id = serializers.IntegerField(source='examen.id', read_only=True)
    examen_codigo_cups = serializers.CharField(source='examen.codigo_cups', read_only=True)
    examen_valor_referencia = serializers.CharField(source='examen.valor_referencia', read_only=True)
    examen_unidad_medida = serializers.CharField(source='examen.unidad_medida', read_only=True)
    examen_costo_referencia = serializers.CharField(source='examen.costo_referencia', read_only=True)
    examen_tecnica = serializers.CharField(source='examen.tecnica', read_only=True)
    especial = serializers.BooleanField(source='examen.especial', read_only=True)
    nro_plantilla = serializers.IntegerField(source='examen.nro_plantilla', read_only=True)

    class Meta:
        model = EntidadExamen
        fields = [
            'id',
            'examen',
            'entidad',
            'activo',
            'examen_id',
            'examen_codigo_cups',
            'examen_valor_referencia',
            'examen_nombre',
            'examen_unidad_medida',
            'valor_examen',
            'examen_costo_referencia',
            'examen_tecnica',
            'especial',
            'nro_plantilla',
        ]
        validators = [
            UniqueTogetherValidator(
                queryset=EntidadExamen.objects.all(),
                fields=('examen', 'entidad'),
                message='Sólo es posible tener un examen de un tipo por entidad'
            )
        ]


class EntidadSerializer(serializers.ModelSerializer):
    mis_examenes = EntidadExamenSerializer(read_only=True, many=True)
    mis_contactos = ContactoEntidadSerializer(read_only=True, many=True)

    class Meta:
        model = Entidad
        fields = [
            'id',
            'nombre',
            'nit',
            'mis_examenes',
            'direccion',
            'activo',
            'mis_contactos'
        ]
