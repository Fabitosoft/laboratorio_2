def get_page_body(boxes):
    for box in boxes:
        if box.element_tag == 'body':
            return box
        return get_page_body(box.all_children())


class ExamenesEspecialesMixin(object):
    model = None
    def get_numero_examen(self):
        if self.nro_examen_especial:
            return self.nro_examen_especial
        return ''
