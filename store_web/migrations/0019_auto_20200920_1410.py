# Generated by Django 3.0.8 on 2020-09-20 14:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("store_web", "0018_auto_20200918_1804"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="cartitem",
            name="saved_for_later",
        ),
        migrations.DeleteModel(
            name="Tag",
        ),
    ]
