from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers
from store_web import views
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf import settings
from django.conf.urls.static import static

# router = routers.DefaultRouter()
# router.register(r'users', views.UserList.as_view())

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    # path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    # REST API
    path('api/', views.api_root),

    path('api/users/', views.UserList.as_view(), name='users-list'),
    path('api/users/<int:pk>/', views.UserDetails.as_view()),

    path('api/orders/', views.OrdersList.as_view(), name='orders-list'),
    path('api/orders/<int:pk>/', views.OrdersDetails.as_view()),

    path('api/order-items/', views.OrderItemList.as_view(), name='order-items-list'),
    path('api/order-items/<int:pk>/', views.OrderItemDetails.as_view()),

    path('api/discounts/', views.DiscountList.as_view(), name='discounts-list'),
    path('api/discounts/<int:pk>/', views.DiscountDetails.as_view()),

    path('api/address/', views.AddressList.as_view(), name='address-list'),
    path('api/address/<int:pk>/', views.AddressDetails.as_view()),

    path('api/cart-items/', views.CartItemList.as_view(), name='cart-items-list'),
    path('api/cart-items/<int:pk>/', views.CartItemDetails.as_view()),

    path('api/categories/', views.CategoryList.as_view(), name='categories-list'),
    path('api/categories/<int:pk>/', views.CategoryDetails.as_view()),

    path('api/tags/', views.TagList.as_view(), name='tags-list'),
    path('api/tags/<int:pk>/', views.TagDetails.as_view()),

    path('api/products/', views.ProductList.as_view(), name='products-list'),
    path('api/products/<int:pk>/', views.ProductDetails.as_view()),

    path('api/product-details/', views.ProductDetailList.as_view(), name='product-details-list'),
    path('api/product-details/<int:pk>/', views.ProductDetailDetails.as_view()),

]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns = format_suffix_patterns(urlpatterns)
