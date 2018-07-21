from rest_framework import serializers

from .models import Orden, OrdenExamen, OrdenExamenFirmas  # , HistorialOrdenExamen,

from examenes_especiales.api_serializers import CitologiaSerializer


class OrdenExamenFirmasSerializer(serializers.ModelSerializer):
    firmado_por = serializers.CharField(source='especialista.full_name', read_only=True)
    firma_url = serializers.SerializerMethodField()
    especialidad = serializers.CharField(source='especialista.especialidad.nombre', read_only=True)

    class Meta:
        model = OrdenExamenFirmas
        fields = [
            'id',
            'especialista',
            'firmado_por',
            'especialidad',
            'firma_url'
        ]

    def get_firma_url(self, obj):
        if obj.especialista.firma:
            return obj.especialista.firma.url
        return None


# class HistorialOrdenExamenSerializer(serializers.ModelSerializer):
#     generado_por = serializers.CharField(source='generado_por.username', read_only=True)
#
#     class Meta:
#         model = HistorialOrdenExamen
#         fields = '__all__'
#
#
# class OrdenExamenSerializer(serializers.ModelSerializer):
#     sub_categoria_cup_nombre = serializers.CharField(source='examen.subgrupo_cups.nombre', read_only=True)
#     entidad_nombre = serializers.CharField(source='orden.entidad.nombre', read_only=True)
#     mis_bitacoras = HistorialOrdenExamenSerializer(many=True, read_only=True)
#     mis_firmas = OrdenExamenFirmasSerializer(many=True, read_only=True)
#     multifirma = serializers.BooleanField(source='examen.multifirma', read_only=True)
#     mi_biopsia = BiopsiaSerializer(read_only=True)
#     mi_citologia = CitologiaSerializer(read_only=True)
#
#     class Meta:
#         model = OrdenExamen
#         fields = [
#             'id',
#             'examen_estado',
#             'examen',
#             'paciente_nombre',
#             'orden',
#             'mi_biopsia',
#             'mi_citologia',
#             'examen_nombre',
#             'entidad_nombre',
#             'tecnica',
#             'examen_valor_referencia',
#             'examen_codigo_cups',
#             'sub_categoria_cup_nombre',
#             'examen_unidad_medida',
#             'resultado',
#             'descuento',
#             'valor_total',
#             'valor_descuento',
#             'valor_final',
#             'mis_bitacoras',
#             'mis_firmas',
#             'multifirma',
#             'especial',
#             'nro_plantilla',
#             'observaciones'
#         ]
#         extra_kwargs = {
#             'resultado': {'required': False, 'allow_blank': True, 'allow_null': True},
#             'examen_valor_referencia': {'required': False, 'allow_blank': True, 'allow_null': True},
#             'examen_unidad_medida': {'required': False, 'allow_blank': True, 'allow_null': True}
#         }
#
#
class OrdenExamenSerializer(serializers.ModelSerializer):
    nro_orden = serializers.IntegerField(source='orden.nro_orden', read_only=True)
    nro_examen_especial = serializers.SerializerMethodField()
    entidad_nombre = serializers.CharField(source='orden.entidad.nombre', read_only=True)
    examen_estado_nombre = serializers.CharField(source='get_examen_estado_display', read_only=True)
    sub_categoria_cup_nombre = serializers.CharField(source='examen.subgrupo_cups.nombre', read_only=True)
    mis_firmas = OrdenExamenFirmasSerializer(many=True, read_only=True)
    multifirma = serializers.BooleanField(source='examen.multifirma', read_only=True)

    class Meta:
        model = OrdenExamen
        fields = [
            'id',
            'entidad_nombre',
            'nro_examen',
            'nro_orden',
            'nro_examen_especial',
            'examen_estado',
            'sub_categoria_cup_nombre',
            'resultado',
            'mis_firmas',
            'examen_valor_referencia',
            'examen_unidad_medida',
            'examen_estado_nombre',
            'examen',
            'paciente_nombre',
            'orden',
            'tecnica',
            'examen_codigo_cups',
            'examen_nombre',
            'descuento',
            'valor_total',
            'valor_descuento',
            'valor_final',
            'multifirma',
            'especial',
            'nro_plantilla',
            'observaciones',
            'citologia',
            'biopsia',
        ]
        extra_kwargs = {
            'citologia': {'required': False, 'allow_null': True},
            'biopsia': {'required': False, 'allow_null': True},
        }

    def get_nro_examen_especial(self, obj):
        return obj.get_numero_examen_especial()


class OrdenSerializer(serializers.ModelSerializer):
    paciente_nombre = serializers.CharField(source='paciente.full_name', read_only=True)
    paciente_email = serializers.CharField(source='paciente.email', read_only=True)
    paciente_identificacion = serializers.CharField(source='paciente.identificacion', read_only=True)
    entidad_nombre = serializers.CharField(source='entidad.nombre', read_only=True)
    medico_remitente_nombre = serializers.CharField(source='medico_remitente.full_name', read_only=True)
    cajero = serializers.CharField(source='elaborado_por.get_full_name', read_only=True)
    estado_nombre = serializers.CharField(source='get_estado_display', read_only=True)

    class Meta:
        model = Orden
        fields = [
            'id',
            'created',
            'paciente',
            'cajero',
            'paciente_nombre',
            'paciente_email',
            'paciente_identificacion',
            'entidad_nombre',
            'medico_remitente_nombre',
            'medico_remitente',
            'tipo_pago',
            'nro_orden',
            'entidad',
            'estado',
            'estado_nombre',
            'nombre_contacto_alternativo',
            'numero_contacto_alternativo',
            'direccion_contacto_alternativo',
            'valor_total',
            'valor_descuento',
            'valor_final',
        ]
