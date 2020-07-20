from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin, AbstractUser
from django.core.mail import send_mail
from django.db import models
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):

        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email_address'), unique=True)
    first_name = models.CharField(_('first_name'), max_length=30, blank=True)
    last_name = models.CharField(_('last_name'), max_length=30, blank=True)
    date_of_birth = models.DateField(_('date_of_birth'), blank=True, null=True)
    phone = models.CharField(_('phone'), max_length=30, blank=True, null=True)

    date_joined = models.DateTimeField(_('date_joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_full_name(self):

        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def __str__(self):
        return f'email- {self.email}'


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
        return f'id- {self.order_id}'


class OrderItem(models.Model):
    order_item_id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Orders, on_delete=models.CASCADE)
    product_detail = models.OneToOneField('ProductDetail', on_delete=models.CASCADE)

    quantity = models.IntegerField(_('quantity'), default=0)

    class Meta:
        verbose_name = _('order_item')
        verbose_name_plural = _('order_items')

    def __str__(self):
        return f'id- {self.order_item_id}'


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
        return f'id- {self.discount_id}, name- {self.name}'


class Address(models.Model):
    address_id = models.AutoField(primary_key=True)
    users = models.ManyToManyField(User)

    full_name = models.CharField(_('full_name'), max_length=100, blank=True)
    address1 = models.CharField(_('address1'), max_length=200)
    address2 = models.CharField(_('address2'), max_length=200)
    post_code = models.CharField(_('post_code'), max_length=5)
    city = models.CharField(_('city'), max_length=100)
    phone = models.CharField(_('phone'), max_length=30)

    class Meta:
        verbose_name = _('address')
        verbose_name_plural = _('addresses')

    def __str__(self):
        return f'id- {self.address_id}, full name- {self.full_name}'


class CartItem(models.Model):
    cart_item_id = models.AutoField(primary_key=True)
    users = models.ManyToManyField(User)
    product_detail = models.OneToOneField('ProductDetail', null=True, on_delete=models.SET_NULL)

    saved_for_later = models.BooleanField(_('saved_for_later'), blank=True)
    quantity = models.IntegerField(_('quantity'), default=0)
    time_added = models.DateTimeField(_('time_added'), auto_now_add=True)

    class Meta:
        verbose_name = _('cart_item')
        verbose_name_plural = _('cart_items')

    def __str__(self):
        return f'id- {self.cart_item_id}'


class Category(models.Model):
    category_id = models.AutoField(primary_key=True)

    name = models.CharField(_('name'), max_length=100)

    class Meta:
        verbose_name = _('category')
        verbose_name_plural = _('categories')

    def __str__(self):
        return f'<id- {self.category_id}'


class Tag(models.Model):
    tag_id = models.AutoField(primary_key=True)
    products = models.ManyToManyField('Product')

    tag = models.CharField(_('tag'), max_length=100)

    class Meta:
        verbose_name = _('tag')
        verbose_name_plural = _('tags')

    def __str__(self):
        return f'id- {self.tag_id}, tag- {self.tag}'


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    category = models.ManyToManyField(Category)

    name = models.CharField(_('name'), max_length=100)
    price = models.DecimalField(_('price'), max_digits=100, decimal_places=2)

    class Meta:
        verbose_name = _('product')
        verbose_name_plural = _('products')

    def __str__(self):
        return f'id- {self.product_id}, name- {self.name}'


class ProductDetail(models.Model):
    product_detail_id = models.AutoField(primary_key=True)
    product = models.ManyToManyField(Product)

    description = models.TextField(_('description'))

    class Meta:
        verbose_name = _('product_detail')
        verbose_name_plural = _('product_details')

    def __str__(self):
        return f'id- {self.product_detail_id}'

