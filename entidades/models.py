from django.contrib.auth.models import Group
from django.db import models
from registration.forms import User

from examenes.models import Examen


class Entidad(models.Model):
    nombre = models.CharField(max_length=200, unique=True)
    nit = models.CharField(max_length=100, null=True, blank=True, unique=True)
    direccion = models.CharField(max_length=200, null=True, blank=True)
    telefono = models.CharField(max_length=200, null=True, blank=True)
    examenes = models.ManyToManyField(Examen, through='EntidadExamen')
    activo = models.BooleanField(default=True)
    usuario = models.OneToOneField(User, on_delete=models.SET_NULL, related_name='mi_entidad', null=True, blank=True)

    def create_user(self):
        username = 'en-%s' % (self.nit)
        user = User.objects.create_user(
            username=username.lower(),
            password=self.nit,
            first_name=self.nombre.upper()
        )
        self.usuario = user
        new_group, created = Group.objects.get_or_create(name='Entidades')
        user.groups.add(new_group)
        self.save()

    class Meta:
        verbose_name_plural = 'Entidades'
        verbose_name = 'Entidad'
        permissions = (
            ('list_entidad', 'Can list entidades'),
            ('detail_entidad', 'Can detail entidad'),
        )

    def __str__(self):
        return self.nombre


class ContactoEntidad(models.Model):
    nombre = models.CharField(max_length=150, blank=True, null=True)
    correo_electronico = models.EmailField()
    entidad = models.ForeignKey(Entidad, related_name='mis_contactos', on_delete=models.CASCADE)
    enviar_correo = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Contactos Entidad'
        verbose_name = 'Contacto Entidad'
        permissions = (
            ('list_contactoentidad', 'Can list contactos entidades'),
            ('detail_contactoentidad', 'Can detail contacto entidad'),
        )


class EntidadExamen(models.Model):
    examen = models.ForeignKey(Examen, on_delete=models.PROTECT, related_name='mis_entidades')
    entidad = models.ForeignKey(Entidad, on_delete=models.PROTECT, related_name='mis_examenes')
    valor_examen = models.DecimalField(max_digits=10, decimal_places=1, default=0)
    activo = models.BooleanField(default=True)

    class Meta:
        unique_together = [('examen', 'entidad')]
        permissions = (
            ('list_entidadexamen', 'Can list entidad examenes'),
            ('detail_entidadexamen', 'Can detail entidad examen'),
        )
