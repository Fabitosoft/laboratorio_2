# Generated by Django 2.0.2 on 2018-02-24 14:33

from django.db import migrations, models
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Paciente',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('tipo_documento', models.CharField(choices=[('CC', 'Cédula Ciudadanía'), ('CE', 'Cédula Extrangería'), ('PS', 'Pasaporte'), ('TI', 'Tarjeta Identidad')], default='CC', max_length=2)),
                ('nro_identificacion', models.CharField(max_length=30, unique=True)),
                ('nombre', models.CharField(max_length=60)),
                ('nombre_segundo', models.CharField(blank=True, max_length=60, null=True)),
                ('apellido', models.CharField(max_length=60)),
                ('apellido_segundo', models.CharField(blank=True, max_length=60, null=True)),
                ('fecha_nacimiento', models.DateTimeField()),
                ('telefono', models.CharField(blank=True, max_length=20, null=True)),
                ('telefono_2', models.CharField(blank=True, max_length=20, null=True)),
                ('telefono_3', models.CharField(blank=True, max_length=20, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('email_2', models.EmailField(blank=True, max_length=254, null=True)),
                ('genero', models.CharField(choices=[('F', 'Femenino'), ('M', 'Masculino')], default='F', max_length=20)),
                ('grupo_sanguineo', models.CharField(blank=True, max_length=60, null=True)),
            ],
            options={
                'verbose_name': 'Paciente',
                'verbose_name_plural': 'Pacientes',
                'permissions': [('list_paciente', 'Can list Paciente')],
            },
        ),
    ]
