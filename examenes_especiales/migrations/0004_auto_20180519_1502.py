# Generated by Django 2.0.2 on 2018-05-19 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('examenes_especiales', '0003_auto_20180519_1338'),
    ]

    operations = [
        migrations.AlterField(
            model_name='biopsia',
            name='descripcion_macroscopica',
            field=models.TextField(blank=True, null=True, verbose_name='Descripción Macroscopica'),
        ),
        migrations.AlterField(
            model_name='biopsia',
            name='descripcion_microscopica',
            field=models.TextField(blank=True, null=True, verbose_name='Descripción Microscopica'),
        ),
        migrations.AlterField(
            model_name='biopsia',
            name='diagnostico',
            field=models.TextField(blank=True, null=True, verbose_name='Diagnostico'),
        ),
    ]
