from django.shortcuts import render
from rest_framework import viewsets
from subscriptions.models import Service, SubscriptionPlan
from order.models import Subscription
from .serializer import ServiceSerializer, SubscriptionPlanSerializer, SubscriptionSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    """Тригер для моделі Service"""
    
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class SubscriptionPlanViewSet(viewsets.ModelViewSet):
    """Тригер для моделі SubscriptionPlan"""
    
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer


class SubscriptionViewSet(viewsets.ModelViewSet):
    """Тригер для моделі Subscription"""
    
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

