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

    def generar_pdf(self, request, orden_examen, nro_examen_especial):
        ctx = {
            'paciente': orden_examen.orden.paciente,
            'orden': orden_examen.orden,
            'entidad': orden_examen.orden.entidad,
            'medico_remitente': orden_examen.orden.medico_remitente,
            'examen': orden_examen,
            'nro_examen_especial': nro_examen_especial,
        }
        html_get_template = get_template('email/ordenes/resultados/datos_orden.html').render(ctx)
        html = HTML(
            string=html_get_template,
            base_url=request.build_absolute_uri()
        )
        header_datos = html.render(
            stylesheets=[CSS(string='div {position: fixed; top: 0, margin:0, padding:0}')])

        header_datos_page = header_datos.pages[0]
        header_datos_body = get_page_body(header_datos_page._page_box.all_children())
        header_datos_body = header_datos_body.copy_with_children(header_datos_body.all_children())

        html_get_template = get_template('email/ordenes/resultados/especiales/resultados_especiales.html').render(ctx)

        html = HTML(
            string=html_get_template,
            base_url=request.build_absolute_uri()
        )

        main_doc = html.render(stylesheets=[CSS('static/css/pdf_ordenes_resultado.min.css')])

        html_get_template = get_template('email/ordenes/resultados/cabecera.html').render()
        html = HTML(
            string=html_get_template,
            base_url=request.build_absolute_uri()
        )
        header_logo = html.render(
            stylesheets=[CSS(string='div {position: fixed; top: 0, margin:0, padding:0}')])

        header_logo_page = header_logo.pages[0]
        header_logo_body = get_page_body(header_logo_page._page_box.all_children())
        header_logo_body = header_logo_body.copy_with_children(header_logo_body.all_children())

        html_get_template = get_template('email/ordenes/resultados/pie_pagina.html').render(ctx)
        html = HTML(
            string=html_get_template,
            base_url=request.build_absolute_uri()
        )
        footer = html.render(stylesheets=[CSS(string='div {position: fixed; bottom: 0.7cm}')])

        footer_page = footer.pages[0]
        footer_body = get_page_body(footer_page._page_box.all_children())
        footer_body = footer_body.copy_with_children(footer_body.all_children())

        for i, page in enumerate(main_doc.pages):
            page_body = get_page_body(page._page_box.all_children())

            page_body.children += header_logo_body.all_children()
            page_body.children += header_datos_body.all_children()
            page_body.children += footer_body.all_children()

        output = BytesIO()
        main_doc.write_pdf(
            target=output
        )
        orden_examen.pdf_examen.delete()
        filename = "%s_%s_%s_%s.pdf" % (
            orden_examen.examen.get_nro_plantilla_display(),
            orden_examen.orden.nro_orden,
            orden_examen.nro_examen,
            orden_examen.orden.paciente.nro_identificacion
        )
        orden_examen.pdf_examen.save(filename, File(output))
