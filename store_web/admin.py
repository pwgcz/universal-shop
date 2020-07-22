from django.contrib import admin
from .models import User, Product, Orders, ProductDetail, OrderItem, Discount, Address, Category, Tag


class UserAdmin(admin.ModelAdmin):
    empty_value_display = 'unknown'
    fields = ('email', 'first_name', 'last_name', 'date_of_birth', 'phone', 'is_active', 'is_staff')
    list_display = ('email', 'first_name', 'last_name', 'date_of_birth', 'phone', 'is_active', 'is_staff')


class ProductAdmin(admin.ModelAdmin):
    empty_value_display = 'unknown'
    fields = ('category', 'name', 'price', 'image')
    list_display = ('name', 'price', 'image')


class ProductDetailAdmin(admin.ModelAdmin):
    empty_value_display = 'unknown'
    fields = ('product', 'description', 'file')


class OrdersAdmin(admin.ModelAdmin):
    empty_value_display = 'unknown'
    fields = ('discount', 'addresses')
    list_display = ('crate_date', 'modified_date', 'status', 'amount')


class OrderItemAdmin(admin.ModelAdmin):
    empty_value_display = 'unknown'
    fields = ('order', 'quantity')
    list_display = ('order', 'quantity')


class DiscountAdmin(admin.ModelAdmin):
    empty_value_display = 'unknown'
    fields = ('name', 'discount', 'crate_date', 'valid_date', 'quantity')
    list_display = ('name', 'discount', 'crate_date', 'valid_date', 'quantity')


class AddressAdmin(admin.ModelAdmin):
    empty_value_display = 'unknown'
    fields = ('full_name', 'address1', 'address2', 'post_code', 'city', 'phone', 'users')
    list_display = ('full_name', 'address1', 'address2', 'post_code', 'city', 'phone',)


class CategoryAdmin(admin.ModelAdmin):
    empty_value_display = 'unknown'
    fields = ('name',)
    list_display = ('name',)


class TagAdmin(admin.ModelAdmin):
    empty_value_display = 'unknown'
    fields = ('name', 'products')


admin.site.register(User, UserAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductDetail, ProductDetailAdmin)
admin.site.register(Orders, OrdersAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Discount, DiscountAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Tag, TagAdmin)

