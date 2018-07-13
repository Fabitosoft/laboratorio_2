from rest_framework.decorators import list_route
from rest_framework.response import Response

from laboratorio_2.utils_queryset import query_varios_campos_or
from .models import Paciente
from rest_framework import viewsets, permissions

from .api_serializers import PacienteSerializer


class PacienteViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

    @list_route(methods=['get'])
    def buscar_x_parametro(self, request):
        parametro = request.GET.get('parametro')
        qs = None
        if len(parametro) > 5:
            search_fields = ['=nro_identificacion', 'nombre', 'nombre_segundo', 'apellido', 'apellido_segundo']
            qs = query_varios_campos_or(self.queryset, search_fields, parametro)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def validar_nuevo_paciente(self, request) -> Response:
        validacion_reponse = {}
        nro_identificacion = self.request.GET.get('nro_identificacion', None)
        tipo_documento = self.request.GET.get('tipo_documento', None)

        if nro_identificacion and tipo_documento and Paciente.existe_documento(tipo_documento, nro_identificacion):
            validacion_reponse.update({'nro_identificacion': 'Ya exite'})

        return Response(validacion_reponse)