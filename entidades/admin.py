from django.contrib import admin
from import_export.resources import ModelResource
from import_export.admin import ImportExportModelAdmin

from .models import Entidad, ContactoEntidad, EntidadExamen


class ContactoEntidadInline(admin.TabularInline):
    model = ContactoEntidad
    fields = ['nombre', 'correo_electronico', 'entidad', 'enviar_correo']


class EntidadExamenInLine(admin.TabularInline):
    model = EntidadExamen
    fields = ['codigo_cups', 'examen', 'valor_examen', 'valor_referencia']
    raw_id_fields = ['examen']
    readonly_fields = ['valor_referencia', 'codigo_cups']

    def codigo_cups(self, instance):
        return instance.examen.codigo_cups

    def valor_referencia(self, instance):
        return instance.examen.costo_referencia

    valor_referencia.short_description = "Valor Referencia"


class EntidadResource(ModelResource):
    class Meta:
        model = Entidad


class EntidadAdmin(ImportExportModelAdmin):
    search_fields = ['nombre']
    list_display = [
        'nombre',
        'nit',
        'direccion',
        'telefono',
    ]
    resource_class = EntidadResource
    inlines = [ContactoEntidadInline, EntidadExamenInLine]


admin.site.register(Entidad, EntidadAdmin)
