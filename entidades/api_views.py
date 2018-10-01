from io import BytesIO

from django.db.models import Sum
from django.http import HttpResponse
from django.template.loader import get_template
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response
from weasyprint import HTML, CSS

from laboratorio_2.utils_queryset import query_varios_campos_or
from .models import Entidad, ContactoEntidad, EntidadExamen
from rest_framework import viewsets, permissions
from ordenes.models import OrdenExamen

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
        if not entidad.usuario:
            entidad.create_user()
        serializer = self.get_serializer(entidad)
        return Response(serializer.data)

    @detail_route(methods=['post'])
    def print_relacion_cobro(self, request, pk=None):
        entidad = self.get_object()
        tipo_pago = self.request.POST.get('tipo_pago')
        fecha_ini = self.request.POST.get('fecha_ini')
        fecha_fin = self.request.POST.get('fecha_fin')
        examenes = OrdenExamen.objects.select_related('orden', 'orden__paciente', 'examen').filter(
            orden__entidad=entidad,
            orden__fecha_ingreso__date__lte=fecha_fin,
            orden__fecha_ingreso__date__gte=fecha_ini,
            orden__tipo_pago=tipo_pago,
            orden__estado=1
        ).order_by('orden__fecha_ingreso')
        ctx = {
            'entidad': entidad,
            'examenes': examenes,
            'fecha_ini': fecha_ini,
            'fecha_fin': fecha_fin,
            'cantidad': examenes.count(),
            'valor_total': examenes.aggregate(valor_total=Sum('valor_total'))['valor_total'],
            'valor_descuento': examenes.aggregate(valor_descuento=Sum('valor_descuento'))['valor_descuento'],
            'valor_final': examenes.aggregate(valor_final=Sum('valor_final'))['valor_final'],
            'tipo_pago': tipo_pago,
        }
        html_get_template = get_template('reportes/relacion_cobro/relacion_cobro.html').render(ctx)

        html = HTML(
            string=html_get_template,
            base_url=request.build_absolute_uri()
        )

        main_doc = html.render(stylesheets=[CSS('static/css/pdf_ordenes_recibos.min.css')])

        output = BytesIO()
        main_doc.write_pdf(
            target=output
        )
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="somefilename.pdf"'
        response['Content-Transfer-Encoding'] = 'binary'
        response.write(output.getvalue())
        output.close()
        return response


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
