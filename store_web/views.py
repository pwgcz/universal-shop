from django.db.models import F
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView


from .models import Orders, OrderItem, Address, CartItem, Category, Tag, Product
from rest_framework import status

from .serializers import OrdersSerializer, OrderItemSerializer, AddressSerializer, \
    CartItemSerializer, CategorySerializer, TagSerializer, ProductSerializer


class IsStaffUser(BasePermission):

    def has_permission(self, request, view):

        return bool(request.user and request.user.is_staff)


class OrdersList(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        serializer = OrdersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        user_id = self.request.user.id
        orders = Orders.objects.filter(users=user_id)
        serializer = OrdersSerializer(orders, many=True)
        return Response(serializer.data)


class OrdersDetails(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk, format=None):
        order = get_object_or_404(Orders, pk=pk)
        serializer = OrdersSerializer(order)
        return Response(serializer.data)


class OrdersListStaff(APIView):

    def get(self, request, format=None):
        orders = Orders.objects.all()
        serializer = OrdersSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = OrdersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrdersDetailsStaff(APIView):

    def patch(self, request, pk, format=None):
        order = get_object_or_404(Orders, pk=pk)
        serializer = OrdersSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        order = get_object_or_404(Orders, pk=pk)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OrderItemList(APIView):

    def post(self, request, format=None):
        serializer = OrderItemSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderItemDetails(APIView):

    def get(self, request, pk, format=None):
        order_item = OrderItem.objects.filter(order=pk)
        serializer = OrderItemSerializer(order_item, many=True)
        return Response(serializer.data)


class AddressList(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        user_id = self.request.user.id
        address = Address.objects.filter(users=user_id)
        serializer = AddressSerializer(address, many=True)
        return Response(serializer.data)


class AddressDetails(APIView):

    permission_classes = (IsAuthenticated,)

    def put(self, request, pk, format=None):
        address = get_object_or_404(Address, pk=pk)
        serializer = AddressSerializer(address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        address = get_object_or_404(Address, pk=pk)
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CartItemList(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            product_added_to_cart = Product.objects.get(pk=request.data.get('product', None))
            product_added_to_cart.quantity = F('quantity') - 1
            product_added_to_cart.save()

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        user_id = self.request.user.id
        cart_items = CartItem.objects.filter(users=user_id)
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)

    def delete(self, request, format=None):
        user_id = self.request.user.id
        cart_item = CartItem.objects.filter(users=user_id)
        cart_item.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class CartItemDetails(APIView):

    def delete(self, request, pk, format=None):
        cart_item = get_object_or_404(CartItem, pk=pk)
        product_removed_from_cart = cart_item.product
        product_removed_from_cart.quantity = F('quantity') + 1
        product_removed_from_cart.save()
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryList(APIView):

    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


class CategoryDetailsStaff(APIView):

    def delete(self, request, pk, format=None):
        category = get_object_or_404(Category, pk=pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryListStaff(APIView):
    permission_classes = (IsAuthenticated, IsStaffUser)

    def post(self, request, format=None):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductList(ListAPIView):

    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()

        category = self.request.query_params.get("category", None)
        if category:
            queryset = queryset.filter(category__name=category)

        max_price = self.request.query_params.get('max_price', None)
        min_price = self.request.query_params.get('min_price', None)
        if max_price or min_price:
            queryset = queryset.filter(price__lte=max_price, price__gte=min_price)

        return queryset


class ProductDetails(APIView):

    def get(self, request, pk, format=None):
        products = Product.objects.get(pk=pk)
        serializer = ProductSerializer(products)
        return Response(serializer.data)


class ProductListStaff(APIView):
    permission_classes = (IsAuthenticated, IsStaffUser)

    def post(self, request, format=None):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailsStaff(APIView):
    
    permission_classes = (IsAuthenticated, IsStaffUser)

    def put(self, request, pk, format=None):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        product = get_object_or_404(Product, pk=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TagList(APIView):

    def get(self, request, format=None):
        tag = Tag.objects.all()
        serializer = TagSerializer(tag, many=True)
        return Response(serializer.data)


class TagDetails(APIView):

    def get(self, request, pk, format=None):
        tag = Tag.objects.get(pk=pk)
        serializer = TagSerializer(tag)
        return Response(serializer.data)



@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'orders': reverse('orders-list', request=request, format=format),
        'order_items': reverse('order-items-list', request=request, format=format),
        'address': reverse('address-list', request=request, format=format),
        'cart_items': reverse('cart-items-list', request=request, format=format),
        'category': reverse('categories-list', request=request, format=format),
        'tags': reverse('tags-list', request=request, format=format),
        'products': reverse('products-list', request=request, format=format),
    })

