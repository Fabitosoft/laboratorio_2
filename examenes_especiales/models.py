from django.db import models
from model_utils.models import TimeStampedModel

from examenes_especiales.mixins import ExamenesEspecialesMixin

from ordenes.models import OrdenExamen


class ExamenEspecial(ExamenesEspecialesMixin, TimeStampedModel):
    nro_examen_especial = models.PositiveIntegerField(null=True, blank=True, unique=True)

    class Meta:
        abstract = True


class Biopsia(ExamenEspecial):
    orden_examen = models.OneToOneField(OrdenExamen, on_delete=models.CASCADE, related_name='biopsia')
    observaciones = models.TextField(null=True, blank=True)
    descripcion_macroscopica = models.TextField(null=True, blank=True, verbose_name='Descripción Macroscópica')
    descripcion_microscopica = models.TextField(null=True, blank=True, verbose_name='Descripción Microscópica')
    diagnostico = models.TextField(null=True, blank=True, verbose_name='Diagnóstico')


class Citologia(ExamenEspecial):
    # PLANTILLA 2
    orden_examen = models.OneToOneField(OrdenExamen, on_delete=models.CASCADE, related_name='citologia')
    observaciones = models.TextField(null=True, blank=True)
    A1_1 = models.BooleanField(verbose_name='Satisfactoria para evaluación', default=0)
    A1_1a = models.BooleanField(verbose_name='Con presencia de células endocervicales', default=0)
    A1_1b = models.BooleanField(verbose_name='Sin presencia de células endocervicales', default=0)
    A1_2 = models.BooleanField(verbose_name='Insactisfactoria para evaluación', default=0)

    A1_i = models.BooleanField(verbose_name='Exudado inflamatorio', default=0)
    A1_ii = models.BooleanField(verbose_name='Hemorragia', default=0)
    A1_iii = models.BooleanField(verbose_name='Citolisis', default=0)
    A1_iv = models.BooleanField(verbose_name='Extendido Grueso', default=0)
    A1_v = models.BooleanField(verbose_name='Mala preservación/fijación', default=0)
    A1_vi = models.BooleanField(verbose_name='Escasa Celularidad', default=0)
    A1_vii = models.BooleanField(verbose_name='Datos Clínicos Insuficientes', default=0)

    A3 = models.BooleanField(verbose_name='Muestra no evaluada por', default=0)
    A3a = models.BooleanField(verbose_name='Ruptura de la placa que hace imposible la reparación', default=0)
    A3b = models.BooleanField(verbose_name='Ausencia de Identificación', default=0)

    B1 = models.BooleanField(verbose_name='Negativa para lesión intraepitelial o malignidad', default=0)

    B1a = models.BooleanField(verbose_name='Con cambios celulares reactivos asociados a', default=0)
    B1a_i = models.BooleanField(verbose_name='Inflamación', default=0)
    B1a_ii = models.BooleanField(verbose_name='Irradiación', default=0)
    B1a_iii = models.BooleanField(verbose_name='Dispositivo Intrauterino', default=0)
    B1a_iv = models.BooleanField(verbose_name='Reparación', default=0)

    B1b = models.BooleanField(verbose_name='Con Cambios por Atrofia', default=0)
    B1c = models.BooleanField(verbose_name='Con Células glandulares benignas post-histerectomía', default=0)
    B1d = models.BooleanField(verbose_name='Con presencia de células endometriales fuera de fase', default=0)

    B2 = models.BooleanField(verbose_name='Anormalidad en células epiteliales escamosas', default=0)
    B2a = models.BooleanField(verbose_name='De significado indeterminado (ASC-US)', default=0)
    B2b = models.BooleanField(verbose_name='Que no permite excluir lesión intraepitelial de alto grado', default=0)

    B3 = models.BooleanField(verbose_name='Lesión escamosa epitelial de bajo grado', default=0)
    B3a = models.BooleanField(verbose_name='Incluye cambios por VPH', default=0)

    B4 = models.BooleanField(verbose_name='Lesión escamosa epitelial de alto grado', default=0)
    B5 = models.BooleanField(verbose_name='Carcinoma escamocelular', default=0)

    B6 = models.BooleanField(verbose_name='Anormalidades en', default=0)
    B6a = models.BooleanField(verbose_name='Células epiteliales', default=0)
    B6a_i = models.BooleanField(verbose_name='Endocervicales sin ninguna otra especificación', default=0)
    B6a_ii = models.BooleanField(verbose_name='Endometriales sin ninguna otra especificación', default=0)

    # B6b = models.BooleanField(verbose_name='Células endocervicales glandulares que favorecen opción', default=0)
    B7 = models.BooleanField(verbose_name='Adenocarcinoma endocervical in situ', default=0)

    B8 = models.BooleanField(verbose_name='Adenocarcinoma', default=0)
    B8a = models.BooleanField(verbose_name='Endocervical', default=0)
    B8b = models.BooleanField(verbose_name='Endometrial', default=0)
    B8c = models.BooleanField(verbose_name='Extrauterino', default=0)
    B8d = models.BooleanField(verbose_name='De sitio no especificado', default=0)

    B9 = models.BooleanField(verbose_name='Otra Neoplastia Maligna', default=0)

    C1 = models.BooleanField(verbose_name='No se observan microorganismos patógenos', default=0)
    C2 = models.BooleanField(verbose_name='Bacterias morfológicamente consistentes con actinomyces', default=0)
    C3 = models.BooleanField(verbose_name='Desviación de la flora sugestiva de vaginosis bacteriana', default=0)
    C4 = models.BooleanField(verbose_name='Trichonomas vaginalis', default=0)
    C5 = models.BooleanField(verbose_name='Hongos mofológicamente compatibles con Candida Sp', default=0)
    C6 = models.BooleanField(verbose_name='Cambios citopáticos asociados a Herpes', default=0)
    C7 = models.BooleanField(verbose_name='No se observan microorganismos', default=0)
