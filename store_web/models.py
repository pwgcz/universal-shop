from django.db import models
from django.utils.translation import ugettext_lazy as _

from authentication.models import User


class Orders(models.Model):
    order_id = models.AutoField(primary_key=True)
    user = models.ManyToManyField(User)
    addresses = models.ManyToManyField('Address')
    discount = models.OneToOneField('Discount', null=True, on_delete=models.SET_NULL)

    crate_date = models.DateTimeField(_('crate_date'), auto_now_add=True)
    modified_date = models.DateTimeField(_('modified_date'), auto_now=True)
    status = models.CharField(_('status'), max_length=100)
    amount = models.IntegerField(_('amount'), default=0)

    class Meta:
        verbose_name = _('order')
        verbose_name_plural = _('orders')

    def __str__(self):
        return f'id: {self.order_id}, user: {self.user}'


class OrderItem(models.Model):
    order_item_id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Orders, on_delete=models.CASCADE)
    product = models.OneToOneField('Product', on_delete=models.CASCADE, null=True)

    quantity = models.IntegerField(_('quantity'), default=0)

    class Meta:
        verbose_name = _('order_item')
        verbose_name_plural = _('order_items')

    def __str__(self):
        return f'id: {self.order_item_id}'


class Discount(models.Model):
    discount_id = models.AutoField(primary_key=True)

    name = models.CharField(_('name'), max_length=50, blank=True)
    discount = models.DecimalField(_('discount'), max_digits=100, decimal_places=2)
    crate_date = models.DateTimeField(_('crate_date'), auto_now_add=True)
    valid_date = models.DateTimeField(_('valid_date'))
    quantity = models.IntegerField(_('quantity'), default=0)

    class Meta:
        verbose_name = _('discount')
        verbose_name_plural = _('discounts')

    def __str__(self):
        return f'id: {self.discount_id}, name: {self.name}'


class Address(models.Model):
    address_id = models.AutoField(primary_key=True)
    users = models.ManyToManyField(User)

    country = models.CharField(_('country'), max_length=100, blank=True)
    street = models.CharField(_('street'), max_length=200, null=True)
    post_code = models.CharField(_('post_code'), max_length=10)
    city = models.CharField(_('city'), max_length=100)
    phone = models.CharField(_('phone'), max_length=30)

    class Meta:
        verbose_name = _('address')
        verbose_name_plural = _('addresses')

    def __str__(self):
        return f'id: {self.address_id}, full name: {self.city}'


class CartItem(models.Model):
    cart_item_id = models.AutoField(primary_key=True)
    users = models.ManyToManyField(User)
    product = models.OneToOneField('Product', null=True, on_delete=models.SET_NULL)

    saved_for_later = models.BooleanField(_('saved_for_later'), blank=True)
    quantity = models.IntegerField(_('quantity'), default=0)
    time_added = models.DateTimeField(_('time_added'), auto_now_add=True)

    class Meta:
        verbose_name = _('cart_item')
        verbose_name_plural = _('cart_items')

    def __str__(self):
        return f'id: {self.cart_item_id}, user: {self.users}'


class Category(models.Model):
    category_id = models.AutoField(primary_key=True)

    name = models.CharField(_('name'), max_length=100)

    class Meta:
        verbose_name = _('category')
        verbose_name_plural = _('categories')

    def __str__(self):
        return f'<id: {self.category_id}, name: {self.name}'


class Tag(models.Model):
    tag_id = models.AutoField(primary_key=True)
    products = models.ManyToManyField('Product')

    tag = models.CharField(_('tag'), max_length=100)

    class Meta:
        verbose_name = _('tag')
        verbose_name_plural = _('tags')

    def __str__(self):
        return f'id: {self.tag_id}, tag: {self.tag}'


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    category = models.ManyToManyField(Category)

    name = models.CharField(_('name'), max_length=100)
    price = models.DecimalField(_('price'), max_digits=100, decimal_places=2)
    quantity = models.IntegerField(_('quantity'), default=1)
    image = models.ImageField(_('image'), upload_to='images', default='/images/default.jpg')
    description = models.TextField(_('description'), null=True)

    class Meta:
        verbose_name = _('product')
        verbose_name_plural = _('products')

    def __str__(self):
        return f'id: {self.product_id}, name: {self.name}'

