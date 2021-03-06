# Generated by Django 2.0.2 on 2018-03-06 13:57

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('medicos', '0005_auto_20180303_0536'),
        ('ordenes', '0003_auto_20180305_0236'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrdenExamenFirmas',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('especialista', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='mis_examenes_firmados', to='medicos.Especialista')),
                ('orden_examen', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mis_firmas', to='ordenes.OrdenExamen')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
