# from django.db.models.signals import post_save
# from django.dispatch import receiver
#
# from .models import OrdenExamen, HistorialOrdenExamen
#
#
# @receiver(post_save, sender=OrdenExamen)
# def guardar_historial(sender, instance, created, **kwargs):
#     tipo = 'Modifico'
#     if created:
#         tipo = 'Creo'
#     historial = HistorialOrdenExamen()
#     for field in OrdenExamen._meta.fields:
#         if hasattr(HistorialOrdenExamen, field.name):
#             setattr(historial, field.name, getattr(instance, field.name))
#     if created:
#         historial.generado_por = instance.creado_por
#     else:
#         historial.generado_por = instance.modificado_por
#     historial.orden_examen = instance
#     historial.examen_estado = instance.get_examen_estado_display()
#     existe = HistorialOrdenExamen.objects.filter(orden_examen=instance, tipo_bitacora='Creo').first()
#     if existe and instance.orden.estado == 0:
#         historial.pk = existe.pk
#         tipo = 'Creo'
#     else:
#         historial.pk = None
#     historial.tipo_bitacora = tipo
#     historial.save()
