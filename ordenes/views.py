from django.db.models import Count, F
from django.shortcuts import render
from django.template.loader import get_template

from django.views.generic import DetailView

from ordenes.mixins import OrdenesPDFMixin
from .models import Orden, OrdenExamen, OrdenExamenFirmas


class ImpresionExamenesView(OrdenesPDFMixin, DetailView):
    model = Orden
    template_name = 'email/ordenes/resultados/resultados.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        orden = self.object
        paciente = orden.paciente

        context['paciente'] = paciente
        context['orden'] = orden
        context['entidad'] = orden.entidad
        context['medico_remitente'] = orden.medico_remitente

        context = self.generar_resultados(orden, context)

        return context
