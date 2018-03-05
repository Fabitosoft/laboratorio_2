# Generated by Django 2.0.2 on 2018-03-03 05:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('medicos', '0005_auto_20180303_0536'),
        ('entidades', '0005_auto_20180224_1339'),
        ('pacientes', '0002_auto_20180225_2347'),
    ]

    operations = [
        migrations.CreateModel(
            name='Orden',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('tipo_pago', models.CharField(choices=[('EFECTIVO', 'Efectivo'), ('TARJETA', 'Tarjeta'), ('RELACION DE COBRO', 'Relación de Cobro'), ('CORTESIA', 'Cortesía')], default='efectivo', max_length=30)),
                ('nombre_contacto_alternativo', models.CharField(blank=True, max_length=200, null=True, verbose_name='Nombre Contacto')),
                ('numero_contacto_alternativo', models.CharField(blank=True, max_length=100, null=True, verbose_name='Número Contacto')),
                ('direccion_contacto_alternativo', models.CharField(blank=True, max_length=200, null=True, verbose_name='Dirección Contacto')),
                ('valor_total', models.DecimalField(decimal_places=1, default=0, max_digits=10, verbose_name='Valor Total')),
                ('valor_descuento', models.DecimalField(decimal_places=1, default=0, max_digits=10, verbose_name='Valor Descuento')),
                ('valor_final', models.DecimalField(decimal_places=1, default=0, max_digits=10, verbose_name='Valor Final')),
                ('estado', models.PositiveIntegerField(choices=[(0, 'Creado'), (1, 'Pagado')], default=0)),
                ('elaborado_por', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='mis_ordenes_elaboradas', to=settings.AUTH_USER_MODEL)),
                ('entidad', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='mis_ordenes', to='entidades.Entidad')),
                ('medico_remitente', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='mis_ordenes', to='medicos.MedicoRemitente')),
                ('paciente', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='mis_ordenes', to='pacientes.Paciente')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
