from dataclasses import field
from email.policy import default
from rest_framework import serializers
from subscriptions.models import Service, SubscriptionPlan
from order.models import Subscription
from core.models import FAQ


# Subscriptions app
class ServiceSerializer(serializers.ModelSerializer):
    """Серіалізатор для моделі Service"""
    
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'image', 'bg_color']

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    """Серіалізатор для моделі SubscriptionPlan"""
    
    class Meta:
        model = SubscriptionPlan
        fields = ['id', 'service', 'name', 'price', 'duration', 'is_active']


# Order app
class SubscriptionSerializer(serializers.ModelSerializer):
    """Серіалізатор для моделі Subscription"""
   
    service = ServiceSerializer()
    plan = SubscriptionPlanSerializer()
    # user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Subscription
        fields = ['id', 'user', 'service', 'plan', 'start_date', 'end_date', 'is_active', 'status']


# Core app
class FAQSerializer(serializers.ModelSerializer):
    """Серіалізатор для моделі FAQ"""
    
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer']
