from .models import User
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'date_of_birth', 'phone', 'date_joined', 'is_active']
