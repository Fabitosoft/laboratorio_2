from django.db.models import Count, F
from django.shortcuts import render
from django.template.loader import get_template

from django.views.generic import DetailView
from .models import Orden, OrdenExamen, OrdenExamenFirmas


class ImpresionExamenesView(DetailView):
    model = Orden
    template_name = 'prueba.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        orden = self.object

        multifirma = OrdenExamen.objects.select_related(
            'examen',
        ).prefetch_related(
            'mis_firmas',
            'mis_firmas__especialista',
            'mis_firmas__especialista__especialidad',
        ).annotate(
            can_firmas=Count("mis_firmas")
        ).filter(
            orden=orden,
            can_firmas__gt=1,
            examen__especial=False,
        )

        una_firma = OrdenExamenFirmas.objects.select_related(
            'especialista',
            'especialista__especialidad',
            'orden_examen',
            'orden_examen__examen',
            'orden_examen__examen__subgrupo_cups',
        ).annotate(
            especialist=F('especialista'),
            can_firmas=Count("orden_examen__mis_firmas")
        ).filter(
            orden_examen__orden=orden,
            orden_examen__examen__especial=False,
            can_firmas=1
        ).order_by('especialist')

        context['html'] = 'nueva prueba'
        context['una_firma'] = una_firma
        context['multifirma'] = multifirma
        return context
