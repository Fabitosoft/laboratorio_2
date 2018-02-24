from django.contrib import admin

from import_export.resources import ModelResource
from import_export.admin import ImportExportModelAdmin

from .models import Examen, CupsGrupo, CupsSubGrupo


class CupsSubGrupoInLine(admin.TabularInline):
    fields = ['nombre', 'orden']
    list_editable = ['orden', ]
    model = CupsSubGrupo


class CupsGrupoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'orden']
    list_editable = ['orden', ]
    inlines = [CupsSubGrupoInLine, ]


class ExamenResource(ModelResource):
    class Meta:
        model = Examen


class ExamenAdmin(ImportExportModelAdmin):
    list_display = ['codigo_cups', 'nombre', 'especial', 'nro_plantilla', 'subgrupo_cups', 'nombre_corto',
                    'valor_referencia', 'unidad_medida',
                    'tecnica']
    search_fields = ['codigo_cups', 'nombre']
    resource_class = ExamenResource
    list_filter = ['subgrupo_cups', 'subgrupo_cups__grupo', 'especial', 'nro_plantilla']
    list_editable = ['especial', 'nro_plantilla']

    def get_queryset(self, request):
        qs = Examen.objects.select_related('subgrupo_cups', 'subgrupo_cups__grupo')
        return qs


admin.site.register(Examen, ExamenAdmin)
admin.site.register(CupsGrupo, CupsGrupoAdmin)
