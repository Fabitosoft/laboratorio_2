from rest_framework import viewsets, permissions
from rest_framework.decorators import list_route
from rest_framework.response import Response

from .api_serializers import ExamenSerializer, CupsSubGrupoSerializer, CupsGrupoSerializer
from .models import Examen, CupsSubGrupo, CupsGrupo


class ExamenViewSet(viewsets.ModelViewSet):
    queryset = Examen.objects.select_related(
        'subgrupo_cups',
        'subgrupo_cups__grupo',
    ).all()
    serializer_class = ExamenSerializer
    permission_classes = [permissions.IsAuthenticated]

    @list_route(methods=['get'])
    def examenes_entidad(self, request):
        id_entidad = request.GET.get('id_entidad')
        qs = self.get_queryset().filter(
            mis_entidades__entidad_id=id_entidad
        )
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def buscar_x_parametro(self, request):
        parametro = request.GET.get('parametro')
        qs = None
        if len(parametro) > 0:
            qs = self.get_queryset().filter(
                nombre__icontains=parametro
            ).distinct()
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class CupsGrupoViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = CupsGrupo.objects.prefetch_related('mis_subgrupos').all()
    serializer_class = CupsGrupoSerializer


class CupsSubGrupoViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = CupsSubGrupo.objects.all()
    serializer_class = CupsSubGrupoSerializer
