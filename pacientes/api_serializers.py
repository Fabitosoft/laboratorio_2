from rest_framework import serializers

from .models import Paciente


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = [
            'id',
            'full_name',
            'nombre',
            'nombre_segundo',
            'apellido',
            'apellido_segundo',
            'email',
            'genero',
            'telefono',
            'telefono_2',
            'tipo_documento',
            'nro_identificacion',
            'fecha_nacimiento',
            'grupo_sanguineo'
        ]
        extra_kwargs = {'full_name': {'read_only': True}}
