# Generated by Django 2.0.2 on 2018-10-23 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('examenes_especiales', '0010_biopsia_nombre'),
    ]

    operations = [
        migrations.AlterField(
            model_name='citologia',
            name='C4',
            field=models.BooleanField(default=0, verbose_name='Trichomonas vaginalis'),
        ),
    ]
