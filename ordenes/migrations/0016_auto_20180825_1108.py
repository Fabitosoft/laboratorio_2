# Generated by Django 2.0.2 on 2018-08-25 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordenes', '0015_orden_fecha_ingreso'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orden',
            name='fecha_ingreso',
            field=models.DateTimeField(null=True),
        ),
    ]
