from rest_framework import serializers
from subscriptions.models import Service, SubscriptionPlan
from order.models import Subscription


class ServiceSerializer(serializers.ModelSerializer):
    """Серіалізатор для моделі Service"""
    
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'image']

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    """Серіалізатор для моделі SubscriptionPlan"""
    
    class Meta:
        model = SubscriptionPlan
        fields = ['id', 'service', 'name', 'price', 'duration', 'is_active']


class SubscriptionSerializer(serializers.ModelSerializer):
    """Серіалізатор для моделі Subscription"""
   
    service = ServiceSerializer()
    plan = SubscriptionPlanSerializer()

    class Meta:
        model = Subscription
        fields = ['id', 'user', 'service', 'plan', 'start_date', 'end_date', 'is_active', 'status']

