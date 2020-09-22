from django.contrib import admin

from authentication.models import User


class UserAdmin(admin.ModelAdmin):
    empty_value_display = "unknown"
    fields = ("email", "user_name", "date_of_birth", "phone", "is_active", "is_staff")
    list_display = (
        "email",
        "user_name",
        "date_of_birth",
        "phone",
        "is_active",
        "is_staff",
    )


admin.site.register(User, UserAdmin)
