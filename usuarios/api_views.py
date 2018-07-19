from django.contrib.auth.models import User, Permission, Group
from knox.models import AuthToken
from rest_framework import viewsets, permissions, generics
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response

from .api_serializers import UsuarioSerializer, LoginUserSerializer, UserSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.select_related(
        'especialista'
    ).prefetch_related(
        'groups'
    ).all()
    serializer_class = UsuarioSerializer

    @list_route(methods=['get'])
    def mi_cuenta(self, request):
        qs = self.get_queryset().filter(
            id=request.user.id
        ).distinct()
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @detail_route(methods=['post'])
    def adicionar_permiso(self, request, pk=None):
        usuario = self.get_object()
        id_permiso = int(request.POST.get('id_permiso'))
        permiso = Permission.objects.get(id=id_permiso)

        tiene_permiso = usuario.user_permissions.filter(id=id_permiso).exists()
        if not tiene_permiso:
            usuario.user_permissions.add(permiso)
        else:
            usuario.user_permissions.remove(permiso)

        serializer = self.get_serializer(usuario)
        return Response(serializer.data)

    @detail_route(methods=['post'])
    def adicionar_grupo(self, request, pk=None):
        usuario = self.get_object()
        id_grupo = int(request.POST.get('id_grupo'))
        permiso = Group.objects.get(id=id_grupo)

        tiene_grupo = usuario.groups.filter(id=id_grupo).exists()
        if not tiene_grupo:
            usuario.groups.add(permiso)
        else:
            usuario.groups.remove(permiso)

        serializer = self.get_serializer(usuario)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def validar_nuevo_usuario(self, request) -> Response:
        qs = self.get_queryset()
        validacion_reponse = {}
        username = self.request.GET.get('username', None)
        if username and qs.filter(username=username).exists():
            validacion_reponse.update({'username': 'Ya exite'})
        return Response(validacion_reponse)


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        punto_venta = request.data.pop('punto_venta')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        tokens = AuthToken.objects.filter(user=user)
        tokens.delete()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user),
            "mi_cuenta": UsuarioSerializer(user, context=self.get_serializer_context()).data,
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
