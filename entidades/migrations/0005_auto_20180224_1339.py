# Generated by Django 2.0.2 on 2018-02-24 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entidades', '0004_entidad_usuario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entidad',
            name='nit',
            field=models.CharField(blank=True, max_length=100, null=True, unique=True),
        ),
    ]
