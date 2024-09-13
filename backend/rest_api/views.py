from django.shortcuts import render
from rest_framework import viewsets
from subscriptions.models import Service, SubscriptionPlan
from order.models import Subscription
from core.models import FAQ
from .serializer import FAQSerializer, ServiceSerializer, SubscriptionPlanSerializer, SubscriptionSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly


# Subscriptions app
class ServiceViewSet(viewsets.ModelViewSet):
    """Тригер для моделі Service"""
    
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class SubscriptionPlanViewSet(viewsets.ModelViewSet):
    """Тригер для моделі SubscriptionPlan"""
    
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer


# Order app
class SubscriptionViewSet(viewsets.ModelViewSet):
    """Тригер для моделі Subscription"""
    
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer


# Core app
class FAQViewSet(viewsets.ModelViewSet):
    """Тригер для моделі FAQ"""
    
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]