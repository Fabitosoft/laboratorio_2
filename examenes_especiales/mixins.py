import datetime
from io import BytesIO

from django.core.files import File
from django.db.models import Max

from django.template.loader import get_template
from weasyprint import HTML, CSS


def get_page_body(boxes):
    for box in boxes:
        if box.element_tag == 'body':
            return box
        return get_page_body(box.all_children())


class ExamenesEspecialesMixin(object):
    nomenclatura = None
    model = None

    def generar_numero(self):
        qs = self.get_modelo_queryset()
        now = datetime.datetime.now()
        base_nro_examen = (abs(int(now.year)) % 100) * 10000
        qs = qs.filter(
            nro_examen_especial__isnull=False,
            nro_examen_especial__gte=base_nro_examen
        ).aggregate(
            ultimo_indice=Max('nro_examen_especial')
        )
        ultimo_indice = qs.get('ultimo_indice')
        if ultimo_indice is None:
            self.nro_examen_especial = base_nro_examen
        else:
            self.nro_examen_especial = int(ultimo_indice) + 1
        self.save()

    def get_numero_examen(self):
        if self.nro_examen_especial:
            return '%s-%s' % (self.nomenclatura, self.nro_examen_especial)
        return ''


class ExamenesEspecialesViewMixin(object):
    nomenclatura = None
    model = None
