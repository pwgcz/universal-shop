from django.urls import path

from authentication.views import current_user, CreateUser, api_root, UpdateUser

urlpatterns = [
    path("current_user/", current_user, name="current_user"),
    path("users/", CreateUser.as_view(), name="users"),
    path("update/<int:pk>/", UpdateUser.as_view(), name="update-user"),
    path("", api_root),
]
