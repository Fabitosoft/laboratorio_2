from django.contrib import admin
from .models import Paciente


class PacienteAdmin(admin.ModelAdmin):
    list_display = [
        'nombre',
        'nombre_segundo',
        'apellido',
        'apellido_segundo',
        'telefono',
        'email',
    ]


admin.site.register(Paciente, PacienteAdmin)
