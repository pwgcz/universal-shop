from django.db import models
from django.utils.translation import ugettext_lazy as _

from authentication.models import User


class Orders(models.Model):
    order_id = models.AutoField(primary_key=True)

    users = models.ForeignKey(User, on_delete=models.CASCADE)
    addresses = models.ForeignKey("Address", on_delete=models.CASCADE)

    crate_date = models.DateTimeField(_("crate_date"), auto_now_add=True)
    modified_date = models.DateTimeField(_("modified_date"), auto_now=True)
    status = models.CharField(_("status"), max_length=256, default="pending")
    amount = models.IntegerField(_("amount"), default=1)

    class Meta:
        ordering = ["-crate_date"]
        verbose_name = _("order")
        verbose_name_plural = _("orders")

    def __str__(self):
        return f"id: {self.order_id}, user: {self.users}"


class OrderItem(models.Model):
    order_item_id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Orders, on_delete=models.CASCADE)
    product = models.ForeignKey("Product", on_delete=models.CASCADE, null=True)

    quantity = models.IntegerField(_("quantity"), default=1)

    class Meta:
        verbose_name = _("order_item")
        verbose_name_plural = _("order_items")

    def __str__(self):
        return f"id: {self.order_item_id}"


class Address(models.Model):
    address_id = models.AutoField(primary_key=True)
    users = models.ManyToManyField(User)

    name = models.CharField(_("country"), max_length=256, blank=True)
    country = models.CharField(_("country"), max_length=256, blank=True)
    street = models.CharField(_("street"), max_length=256, null=True)
    post_code = models.CharField(_("post_code"), max_length=256, null=True)
    city = models.CharField(_("city"), max_length=256, null=True)
    phone = models.CharField(_("phone"), max_length=256, null=True)

    class Meta:
        verbose_name = _("address")
        verbose_name_plural = _("addresses")

    def __str__(self):
        return f"id: {self.address_id}, full name: {self.name}"


class CartItem(models.Model):
    cart_item_id = models.AutoField(primary_key=True)
    users = models.ManyToManyField(User)
    product = models.ForeignKey("Product", on_delete=models.CASCADE)

    quantity = models.IntegerField(_("quantity"), default=1)
    time_added = models.DateTimeField(_("time_added"), auto_now_add=True)

    class Meta:
        verbose_name = _("cart_item")
        verbose_name_plural = _("cart_items")

    def __str__(self):
        return f"id: {self.cart_item_id}, user: {self.users}"


class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    name = models.CharField(_("name"), max_length=256)

    class Meta:
        verbose_name = _("category")
        verbose_name_plural = _("categories")

    def __str__(self):
        return f"<id: {self.category_id}, name: {self.name}"


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    category = models.ManyToManyField(Category)

    name = models.CharField(_("name"), max_length=256)
    price = models.DecimalField(_("price"), max_digits=256, decimal_places=2)
    quantity = models.IntegerField(_("quantity"), default=1)
    image = models.ImageField(
        _("image"), upload_to="images", default="/images/default.jpg"
    )
    description = models.TextField(_("description"), null=True)

    class Meta:
        verbose_name = _("product")
        verbose_name_plural = _("products")

    def __str__(self):
        return f"{self.product_id}, {self.name}, {self.image}"
