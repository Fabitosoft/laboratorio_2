from django.db.models import Q
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response

from .models import Entidad, ContactoEntidad, EntidadExamen
from rest_framework import viewsets

from .api_serializers import EntidadSerializer, ContactoEntidadSerializer, EntidadExamenSerializer


class EntidadViewSet(viewsets.ModelViewSet):
    queryset = Entidad.objects.prefetch_related('usuario').all()
    serializer_class = EntidadSerializer

    @list_route(methods=['get'])
    def buscar_x_parametro(self, request):
        parametro = request.GET.get('parametro')
        qs = None
        if len(parametro) > 0:
            qs = Entidad.objects.filter(
                Q(nit__icontains=parametro) |
                Q(nombre__icontains=parametro)
            ).distinct()
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
    queryset = ContactoEntidad.objects.all()
    serializer_class = ContactoEntidadSerializer

class EntidadExamenViewSet(viewsets.ModelViewSet):
    queryset = EntidadExamen.objects.all()
    serializer_class = EntidadExamenSerializer


