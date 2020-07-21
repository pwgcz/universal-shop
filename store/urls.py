"""store URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers
from store_web import views
from rest_framework.urlpatterns import format_suffix_patterns

# router = routers.DefaultRouter()
# router.register(r'users', views.UserList.as_view())

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    # path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # REST API
    path('api/users/', views.UserList.as_view()),
    path('api/users/<int:pk>/', views.UserDetails.as_view()),

    path('api/orders/', views.OrdersList.as_view()),
    path('api/orders/<int:pk>/', views.OrdersDetails.as_view()),

    path('api/order-items/', views.OrderItemList.as_view()),
    path('api/order-items/<int:pk>/', views.OrderItemDetails.as_view()),

    path('api/discounts/', views.DiscountList.as_view()),
    path('api/discounts/<int:pk>/', views.DiscountDetails.as_view()),

    path('api/address/', views.AddressList.as_view()),
    path('api/address/<int:pk>/', views.AddressDetails.as_view()),

    path('api/cart-items/', views.CartItemList.as_view()),
    path('api/cart-items/<int:pk>/', views.CartItemDetails.as_view()),

    path('api/categories/', views.CategoryList.as_view()),
    path('api/categories/<int:pk>/', views.CategoryDetails.as_view()),

    path('api/tags/', views.TagList.as_view()),
    path('api/tags/<int:pk>/', views.TagDetails.as_view()),

    path('api/products/', views.ProductList.as_view()),
    path('api/products/<int:pk>/', views.ProductDetails.as_view()),

    path('api/product-details/', views.ProductDetailList.as_view()),
    path('api/product-details/<int:pk>/', views.ProductDetailDetails.as_view()),

]


urlpatterns = format_suffix_patterns(urlpatterns)
