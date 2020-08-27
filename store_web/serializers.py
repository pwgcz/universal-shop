from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User, Orders, OrderItem, Discount, Address, CartItem, Category, Tag, Product, ProductDetail
from rest_framework import serializers, permissions
from rest_framework_jwt.settings import api_settings


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'date_of_birth', 'phone', 'date_joined', 'is_active', 'is_staff']


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ['id', 'token', 'email', 'first_name', 'last_name', 'date_of_birth', 'phone', 'date_joined', 'is_active', 'is_staff']


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

    category = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")\


    class Meta:
        model = Product
        fields = ['product_id', 'category', 'name', 'price', 'image']


class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetail
        fields = ['product_detail_id', 'product', 'description']


