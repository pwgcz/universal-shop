from .models import Orders, OrderItem, Discount, Address, CartItem, Category, Tag, Product, ProductDetail
from rest_framework import serializers


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = ['order_id', 'user', 'addresses', 'discount', 'crate_date', 'modified_date', 'status', 'amount']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['order_item_id', 'order', 'product_detail', 'quantity']


class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ['discount_id', 'name', 'discount', 'create_date', 'valid_date', 'quantity']


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['address_id', 'users', 'full_name', 'address1', 'address2', 'post_code', 'city', 'phone']


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['cart_item_id', 'users', 'product_detail', 'saved_for_later', 'quantity', 'time_added']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_id', 'name']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['tag_id', 'products', 'tag']


class ProductSerializer(serializers.ModelSerializer):

    category = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")

    class Meta:
        model = Product
        fields = ['product_id', 'category', 'name', 'price', 'image']


class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetail
        fields = ['product_detail_id', 'product', 'description']


