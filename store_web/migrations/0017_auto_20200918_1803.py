# Generated by Django 3.0.8 on 2020-09-18 18:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store_web', '0016_auto_20200918_1802'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orders',
            name='addresses',
        ),
        migrations.AddField(
            model_name='orders',
            name='addresses',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='store_web.Address'),
        ),
    ]