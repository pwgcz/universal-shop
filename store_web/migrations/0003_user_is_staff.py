# Generated by Django 3.0.8 on 2020-07-20 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store_web', '0002_auto_20200720_1137'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_staff',
            field=models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status'),
        ),
    ]