from django.db.models import Q
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response

from laboratorio_2.utils_queryset import query_varios_campos_or
from .models import Entidad, ContactoEntidad, EntidadExamen
from rest_framework import viewsets, permissions

from .api_serializers import EntidadSerializer, ContactoEntidadSerializer, EntidadExamenSerializer


class EntidadViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Entidad.objects.prefetch_related(
        'usuario',
        'mis_examenes',
        'mis_contactos',
        'mis_examenes__examen'
    ).all()
    serializer_class = EntidadSerializer

    @list_route(methods=['get'])
    def buscar_x_parametro(self, request):
        parametro = request.GET.get('parametro')
        qs = None
        if len(parametro) > 5:
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


class EntidadExamenViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = EntidadExamen.objects.select_related(
        'examen'
    ).all()
    serializer_class = EntidadExamenSerializer
