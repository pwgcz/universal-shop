from django.urls import path

from authentication.views import current_user, CreateUser, api_root

urlpatterns = [
    path('current_user/', current_user, name='current_user'),
    path('users/', CreateUser.as_view(), name='users'),
    path('', api_root),

]
