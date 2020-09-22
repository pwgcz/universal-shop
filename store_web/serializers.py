from .models import Orders, OrderItem, Address, CartItem, Category, Product
from rest_framework import serializers


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = "__all__"

    def to_representation(self, instance):
        self.fields["addresses"] = AddressSerializer(read_only=True)
        return super(OrdersSerializer, self).to_representation(instance)


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"

    def to_representation(self, instance):
        self.fields["product"] = ProductSerializer(read_only=True)
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
        self.fields["product"] = ProductSerializer(read_only=True)
        return super(CartItemSerializer, self).to_representation(instance)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):

    category = serializers.SlugRelatedField(
        many=True, queryset=Category.objects.all(), slug_field="name"
    )

    class Meta:
        model = Product
        fields = "__all__"
