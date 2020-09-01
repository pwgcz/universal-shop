from authentication.models import User
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'date_of_birth', 'phone', 'date_joined', 'is_active', 'is_staff', 'user_name']


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField()

    class Meta:
        model = User
        fields = ['id', 'token', 'user_name', 'email', 'date_of_birth', 'phone', 'date_joined', 'is_active', 'is_staff', 'password']

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.get('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


