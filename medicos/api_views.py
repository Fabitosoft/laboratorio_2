from rest_framework import viewsets, permissions
from rest_framework.decorators import list_route
from rest_framework.response import Response
from django.db.models import Q

from laboratorio_2.utils_queryset import query_varios_campos_or
from .api_serializers import MedicoRemitenteSerializer, EspecialistaSerializer, EspecialidadSerializer
from .models import MedicoRemitente, Especialista, Especialidad


class MedicoRemitenteViewSet(viewsets.ModelViewSet):
    queryset = MedicoRemitente.objects.select_related('especialidad').all()
    serializer_class = MedicoRemitenteSerializer

    @list_route(methods=['get'])
    def buscar_nombre(self, request):
        parametro = request.GET.get('parametro')
        qs = None
        if len(parametro) > 5:
            search_fields = ['nombres', 'apellidos']
            qs = query_varios_campos_or(self.queryset, search_fields, parametro)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class EspecialidadViewSet(viewsets.ModelViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer

    @list_route(methods=['get'])
    def buscar_nombre(self, request):
        parametro = request.GET.get('parametro')
        qs = self.get_queryset().filter(nombre__icontains=parametro)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class EspecialistaViewSet(viewsets.ModelViewSet):
    queryset = Especialista.objects.select_related('especialidad', 'user').all()
    serializer_class = EspecialistaSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @list_route(methods=['get'])
    def mi_cuenta(self, request):
        qs = self.get_queryset().filter(
            user_id=request.user.id
        ).distinct()
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def buscar_x_parametro(self, request):
        parametro = request.GET.get('parametro')
        qs = self.get_queryset().filter(
            Q(nro_identificacion__icontains=parametro) |
            Q(nombre__icontains=parametro) |
            Q(nombre_segundo__icontains=parametro) |
            Q(apellido__icontains=parametro) |
            Q(apellido_segundo__icontains=parametro)
        )
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
