from django.db import models
from model_utils.models import TimeStampedModel


class Paciente(TimeStampedModel):
    CHOICES_TIPO_DOCUMENTO = (
        ('CC', 'Cédula Ciudadanía'),
        ('CE', 'Cédula Extrangería'),
        ('PS', 'Pasaporte'),
        ('TI', 'Tarjeta Identidad'),
    )

    CHOICES_SEXO = (
        ('F', 'Femenino'),
        ('M', 'Masculino')
    )

    tipo_documento = models.CharField(max_length=2, choices=CHOICES_TIPO_DOCUMENTO, default='CC')
    nro_identificacion = models.CharField(max_length=30, unique=True)
    nombre = models.CharField(max_length=60)
    nombre_segundo = models.CharField(max_length=60, null=True, blank=True)
    apellido = models.CharField(max_length=60)
    apellido_segundo = models.CharField(max_length=60, null=True, blank=True)
    fecha_nacimiento = models.DateTimeField()
    telefono = models.CharField(max_length=20, null=True, blank=True)
    telefono_2 = models.CharField(max_length=20, null=True, blank=True)
    telefono_3 = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    email_2 = models.EmailField(null=True, blank=True)
    genero = models.CharField(choices=CHOICES_SEXO, default='F', max_length=20)
    grupo_sanguineo = models.CharField(max_length=60, null=True, blank=True)

    @staticmethod
    def existe_documento(tipo_documento: str, nro_identificacion: str) -> bool:
        return Paciente.objects.filter(tipo_documento=tipo_documento, nro_identificacion=nro_identificacion).exists()

    @property
    def full_name(self):
        nombre_segundo = ''
        if self.nombre_segundo:
            nombre_segundo = ' %s' % (self.nombre_segundo)

        apellido_segundo = ''
        if self.apellido_segundo:
            apellido_segundo = ' %s' % (self.apellido_segundo)

        return '%s%s %s%s' % (self.nombre, nombre_segundo, self.apellido, apellido_segundo)

    @property
    def identificacion(self):
        return '%s %s' % (self.get_tipo_documento_display(), self.nro_identificacion)

    class Meta:
        verbose_name_plural = 'Pacientes'
        verbose_name = 'Paciente'
        permissions = [
            ('list_paciente', 'Can list Paciente'),
        ]
        unique_together = [('tipo_documento', 'nro_identificacion')]

    def __str__(self):
        return '%s %s %s %s' % (self.nombre, self.nombre_segundo, self.apellido, self.apellido_segundo)
