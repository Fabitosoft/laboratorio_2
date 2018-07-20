from django.db.models import Q
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response

from laboratorio_2.utils_queryset import query_varios_campos_or
from .models import Entidad, ContactoEntidad, EntidadExamen
from rest_framework import viewsets, permissions

from .api_serializers import EntidadSerializer, ContactoEntidadSerializer, EntidadExamenSerializer


class EntidadViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Entidad.objects.select_related('usuario').all()
    serializer_class = EntidadSerializer

    @list_route(methods=['get'])
    def buscar_x_parametro(self, request):
        parametro = request.GET.get('parametro')
        qs = None
        if len(parametro) > 3:
            search_fields = ['nit', 'nombre']
            qs = query_varios_campos_or(self.queryset, search_fields, parametro)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @detail_route(methods=['post'])
    def crear_usuario(self, request, pk=None):
        entidad = self.get_object()
        if (not entidad.usuario):
            entidad.create_user()
        serializer = self.get_serializer(entidad)
        return Response(serializer.data)


class ContactoEntidadViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = ContactoEntidad.objects.all()
    serializer_class = ContactoEntidadSerializer

    @list_route(methods=['get'])
    def contactos_por_entidad(self, request):
        id_entidad = request.GET.get('id_entidad')
        qs = self.get_queryset().filter(entidad_id=id_entidad)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class EntidadExamenViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = EntidadExamen.objects.select_related(
        'examen'
    ).all()
    serializer_class = EntidadExamenSerializer

    @list_route(methods=['get'])
    def entidad_examen_por_entidad(self, request):
        id_entidad = request.GET.get('id_entidad')
        qs = self.get_queryset().filter(entidad_id=id_entidad)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
