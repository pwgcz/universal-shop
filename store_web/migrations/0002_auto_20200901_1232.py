# Generated by Django 3.0.8 on 2020-09-01 12:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store_web', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='address',
            name='address1',
        ),
        migrations.RemoveField(
            model_name='address',
            name='address2',
        ),
        migrations.RemoveField(
            model_name='address',
            name='full_name',
        ),
        migrations.RemoveField(
            model_name='cartitem',
            name='product_detail',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='product_detail',
        ),
        migrations.AddField(
            model_name='address',
            name='country',
            field=models.CharField(blank=True, max_length=100, verbose_name='country'),
        ),
        migrations.AddField(
            model_name='address',
            name='street',
            field=models.CharField(max_length=200, null=True, verbose_name='street'),
        ),
        migrations.AddField(
            model_name='cartitem',
            name='product',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='store_web.Product'),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='product',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='store_web.Product'),
        ),
        migrations.AddField(
            model_name='product',
            name='description',
            field=models.TextField(null=True, verbose_name='description'),
        ),
        migrations.AddField(
            model_name='product',
            name='quantity',
            field=models.IntegerField(default=1, verbose_name='quantity'),
        ),
        migrations.AlterField(
            model_name='address',
            name='post_code',
            field=models.CharField(max_length=10, verbose_name='post_code'),
        ),
        migrations.DeleteModel(
            name='ProductDetail',
        ),
    ]