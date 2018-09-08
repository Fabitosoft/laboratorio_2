from django.db import models
import random
from django.contrib.auth.models import User
from model_utils.models import TimeStampedModel

from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit, ResizeCanvas


class Especialidad(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    activo_especialistas = models.BooleanField(default=False)

    class Meta:
        permissions = (
            ('list_especialidad', 'Can list especialidades'),
            ('detail_especialidad', 'Can detail especialidad'),
        )

    def __str__(self):
        return self.nombre


class MedicoRemitente(TimeStampedModel):
    nombres = models.CharField(max_length=200)
    apellidos = models.CharField(max_length=60, null=True, blank=True)
    especialidad = models.ForeignKey(Especialidad, on_delete=models.PROTECT, verbose_name='Especialidad', null=True,
                                     blank=True)
    telefono = models.CharField(max_length=120, null=True, blank=True)

    class Meta:
        permissions = (
            ('list_medicoremitente', 'Can list medicos remitentes'),
            ('detail_medicoremitente', 'Can detail medico remitente'),
        )

    @property
    def full_name(self):
        return '%s %s' % (self.nombres, self.apellidos)

    def __str__(self):
        return '%s %s' % (self.nombres, self.apellidos)


class Especialista(TimeStampedModel):
    def firma_upload_to(instance, filename):
        nombre_especialista = instance.full_name
        nro_random = random.randint(1111, 9999)
        return "especialistas/firmas/%s%s.%s" % (nombre_especialista, nro_random, filename.split('.')[1])

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
    user = models.OneToOneField(User, related_name='especialista', on_delete=models.CASCADE)
    tipo_documento = models.CharField(max_length=2, choices=CHOICES_TIPO_DOCUMENTO, default='CC')
    nro_identificacion = models.CharField(max_length=30, unique=True)
    nombre = models.CharField(max_length=60)
    nombre_segundo = models.CharField(max_length=60, null=True, blank=True)
    apellido = models.CharField(max_length=60)
    apellido_segundo = models.CharField(max_length=60, null=True, blank=True)
    fecha_nacimiento = models.DateTimeField()
    genero = models.CharField(choices=CHOICES_SEXO, default='F', max_length=20)
    grupo_sanguineo = models.CharField(max_length=60, null=True, blank=True)

    especialidad = models.ForeignKey(Especialidad, on_delete=models.PROTECT, verbose_name='Especialidad', null=True,
                                     blank=True)
    universidad = models.CharField(max_length=100, blank=True, null=True)
    registro_profesional = models.CharField(max_length=100, null=True, blank=True)

    firma = ProcessedImageField(
        processors=[ResizeToFit(400, 300), ResizeCanvas(400, 300)],
        format='PNG',
        options={'quality': 100},
        null=True,
        blank=True,
        upload_to=firma_upload_to
    )

    class Meta:
        permissions = (
            ('list_especialista', 'Can list especialistas'),
            ('detail_especialista', 'Can detail especialista'),
        )

    @staticmethod
    def existe_documento(tipo_documento: str, nro_identificacion: str) -> bool:
        return Especialista.objects.filter(tipo_documento=tipo_documento,
                                           nro_identificacion=nro_identificacion).exists()

    @property
    def full_name(self):
        nombre_segundo = ''
        if self.nombre_segundo:
            nombre_segundo = ' %s' % (self.nombre_segundo)

        apellido_segundo = ''
        if self.apellido_segundo:
            apellido_segundo = ' %s' % (self.apellido_segundo)

        return '%s%s %s%s' % (self.nombre, nombre_segundo, self.apellido, apellido_segundo)

    def __str__(self):
        return self.full_name
