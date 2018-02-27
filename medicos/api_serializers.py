from django.contrib.auth.models import User
from rest_framework import serializers

from .models import MedicoRemitente, Especialista, Especialidad


class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = [
            'id',
            'nombre',
            'activo_especialistas'
        ]


class MedicoRemitenteSerializer(serializers.ModelSerializer):
    especialidad_nombre = serializers.CharField(source='especialidad.nombre', read_only=True)

    class Meta:
        model = MedicoRemitente
        fields = [
            'id',
            'nombres',
            'apellidos',
            'especialidad',
            'especialidad_nombre',
            'telefono',
            'full_name'
        ]


class EspecialistaSerializer(serializers.ModelSerializer):
    firma_url = serializers.SerializerMethodField()
    especialidad_nombre = serializers.CharField(source='especialidad.nombre', read_only=True)
    user = serializers.IntegerField(source='user.id', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', required=False)
    is_active = serializers.BooleanField(source='user.is_active', default=True, required=False)
    password = serializers.CharField(source='user.password', write_only=True, required=False)

    class Meta:
        model = Especialista
        fields = [
            'id',
            'full_name',
            'nombre',
            'nombre_segundo',
            'apellido',
            'apellido_segundo',
            'genero',
            'tipo_documento',
            'nro_identificacion',
            'fecha_nacimiento',
            'grupo_sanguineo',
            'especialidad',
            'especialidad_nombre',
            'universidad',
            'registro_profesional',
            'firma',
            'firma_url',
            'user',
            'username',
            'email',
            'is_active',
            'password'
        ]
        extra_kwargs = {
            'full_name': {'read_only': True},
            'firma': {'required': False, 'write_only': True, 'allow_empty_file': True},
            'apellido': {'required': False},
            'fecha_nacimiento': {'required': False},
            'nombre': {'required': False},
            'nro_identificacion': {'required': False},
        }

    def get_firma_url(self, obj):
        if obj.firma:
            return obj.firma.url
        return None

    def create(self, validated_data):
        # user_data = validated_data.pop('user', None)
        nombre = validated_data.get('nombre', None)
        nombre_segundo = validated_data.get('nombre_segundo', None)
        apellido = validated_data.get('apellido', None)
        apellido_segundo = validated_data.get('apellido_segundo', None)
        password = validated_data.get('nro_identificacion', None)
        user_data = validated_data.get('user', None)
        email = user_data.get('email', None)

        first_name = '%s %s'.strip() % (nombre, nombre_segundo)
        last_name = '%s %s'.strip() % (apellido, apellido_segundo)
        username = 'es-%s%s%s' % (nombre[0:3], apellido[0:3], apellido_segundo[0:3])

        if User.objects.filter(username__contains=username).exists():
            username = '%s%s' % (username, User.objects.filter(username__contains=username).count())
        user = User.objects.create_user(
            username=username.lower(),
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            is_active=True
        )
        validated_data.update(user=user)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        email = user_data.get('email', None)
        is_active = user_data.get('is_active', None)

        nombre = validated_data.get('nombre', None)
        nombre_segundo = validated_data.get('nombre_segundo', None)
        apellido = validated_data.get('apellido', None)
        apellido_segundo = validated_data.get('apellido_segundo', None)

        if nombre and apellido:
            first_name = '%s %s'.strip() % (nombre, nombre_segundo)
            last_name = '%s %s'.strip() % (apellido, apellido_segundo)
            instance.user.first_name = first_name
            instance.user.last_name = last_name
        if email:
            instance.user.email = email
            instance.user.is_active = is_active
        instance.user.save()

        return super().update(instance, validated_data)
