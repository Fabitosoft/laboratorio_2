from django.db.models.signals import pre_delete, post_init, post_save
from django.dispatch import receiver

from .models import Especialista

@receiver(pre_delete, sender=Especialista)
def imagen_instalacion_pre_delete(sender, instance, **kwargs):
    instance.firma.delete(False)


@receiver(post_init, sender=Especialista)
def backup_firma_path(sender, instance, **kwargs):
    instance._current_firma = instance.firma


@receiver(post_save, sender=Especialista)
def delete_firma(sender, instance, **kwargs):
    if hasattr(instance, '_current_firma'):
        if instance._current_firma != instance.firma:
            instance._current_firma.delete(save=False)
