from django.contrib import admin
from .models import Product, Orders, OrderItem, Address, Category, CartItem


class CartItemAdmin(admin.ModelAdmin):
    empty_value_display = "unknown"
    fields = (
        "quantity",
        "product",
    )
    list_display = ("quantity", "product")


class ProductAdmin(admin.ModelAdmin):
    empty_value_display = "unknown"
    fields = ("category", "name", "price", "image", "quantity", "description")
    list_display = ("name", "price", "image", "quantity", "description")


class OrdersAdmin(admin.ModelAdmin):
    empty_value_display = "unknown"
    fields = ("addresses",)
    list_display = ("crate_date", "modified_date", "status", "amount")


class OrderItemAdmin(admin.ModelAdmin):
    empty_value_display = "unknown"
    fields = ("order", "quantity", "product")
    list_display = ("order", "quantity", "product")


class AddressAdmin(admin.ModelAdmin):
    empty_value_display = "unknown"
    fields = ("post_code", "city", "users", "country", "street")
    list_display = ("post_code", "city", "country", "street")


class CategoryAdmin(admin.ModelAdmin):
    empty_value_display = "unknown"
    fields = ("name",)
    list_display = ("name",)


admin.site.register(Product, ProductAdmin)
admin.site.register(Orders, OrdersAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(CartItem, CartItemAdmin)
