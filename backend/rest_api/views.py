from rest_framework import viewsets, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from order.models import Subscription
from subscriptions.models import Service, SubscriptionPlan
from core.models import FAQ
from .serializer import CustomUserSerializer, FAQSerializer, ServiceSerializer, SubscriptionPlanSerializer, SubscriptionSerializer


# Subscriptions app
class ServiceViewSet(viewsets.ModelViewSet):
    """
    ViewSet для моделі Service.
    
    Дозволяє здійснювати CRUD-операції над моделлю Service.
    Доступ до всіх методів дозволено всім користувачам.
    """
    
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    # permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, BasicAuthentication]


class SubscriptionPlanViewSet(viewsets.ModelViewSet):
    """
    ViewSet для моделі SubscriptionPlan.
    
    Дозволяє здійснювати CRUD-операції над моделлю SubscriptionPlan.
    Доступ до всіх методів дозволено будь-якому користувачеві.
    """
    
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]


# Order app
class SubscriptionViewSet(viewsets.ModelViewSet):
    """
    ViewSet для моделі Subscription.
    
    Дозволяє здійснювати CRUD-операції над моделлю Subscription.
    Доступ до всіх методів дозволено будь-якому користувачеві.
    """
    
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    
    def perform_create(self, serializer) -> None:
        """
        Призначає поточного користувача для нового об'єкта підписки.
        """
        serializer.save(user=self.request.user)


# Core app
class FAQViewSet(viewsets.ModelViewSet):
    """
    ViewSet для моделі FAQ.
    
    Дозволяє здійснювати CRUD-операції над моделлю FAQ.
    Доступ до всіх методів дозволено будь-якому користувачеві для читання.
    Модифікація доступна лише аутентифікованим користувачам.
    """
    
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]


# User app
class RegisterUserView(APIView):
    """
    Представлення для реєстрації нового користувача через API.

    Це представлення обробляє POST-запити для створення нового користувача на основі даних, переданих у запиті.
    Використовує серіалізатор CustomUserSerializer для валідації та збереження користувача.
    """

    def post(self, request) -> Response:
        """
        Обробляє POST-запит для реєстрації нового користувача.
        """
        serializer = CustomUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(serializer.data)

