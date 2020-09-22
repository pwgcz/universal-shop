from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from store_web import views
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("", TemplateView.as_view(template_name="index.html")),
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", views.api_root),
    path("token-auth/", obtain_jwt_token),
    path("token-refresh/", refresh_jwt_token),
    path("api/", include("store_web.urls")),
    path("auth/", include("authentication.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns = format_suffix_patterns(urlpatterns)
