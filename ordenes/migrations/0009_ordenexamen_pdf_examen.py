# Generated by Django 2.0.2 on 2018-07-23 03:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordenes', '0008_auto_20180721_0929'),
    ]

    operations = [
        migrations.AddField(
            model_name='ordenexamen',
            name='pdf_examen',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]
