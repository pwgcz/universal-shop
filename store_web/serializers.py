from .models import Orders, OrderItem, Address, CartItem, Category, Tag, Product
from rest_framework import serializers


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"

    def to_representation(self, instance):
        self.fields['product'] = ProductSerializer(read_only=True)
        return super(OrderItemSerializer, self).to_representation(instance)


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class CartItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = "__all__"

    def to_representation(self, instance):
        self.fields['product'] = ProductSerializer(read_only=True)
        return super(CartItemSerializer, self).to_representation(instance)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):

    category = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")

    class Meta:
        model = Product
        fields = "__all__"



