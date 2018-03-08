from django.db.models import Count, F

from ordenes.models import OrdenExamenFirmas, OrdenExamen


class OrdenesResultadosMixin(object):
    def generar_resultados(self, orden, context):
        multifirma = OrdenExamen.objects.select_related(
            'examen',
            'examen__subgrupo_cups'
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
            examen_estado__gte=2
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
            can_firmas=1,
            orden_examen__examen_estado__gte=2
        )
        context['multifirma'] = multifirma
        context['una_firma'] = una_firma
        return context
