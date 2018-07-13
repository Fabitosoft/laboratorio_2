from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'is_active',
            'is_staff',
            'password',
            'username',
            'last_login',
            'date_joined',
            'is_superuser',
            'groups',
            'especialista',
            'mi_entidad'
        ]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')
