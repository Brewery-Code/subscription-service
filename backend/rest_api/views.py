from datetime import timedelta, datetime
from django.utils import timezone
from rest_framework import viewsets, serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from order.models import Subscription
from subscriptions.models import Service, SubscriptionPlan
from core.models import FAQ
from .serializer import CustomUserSerializer, FAQSerializer, ServiceSerializer, SubscriptionPlanSerializer, SubscriptionSerializer
from user.models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from dateutil.relativedelta import relativedelta


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
    # authentication_classes = [JWTAuthentication]


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

    # permission_classes = [IsAuthenticated]



# User app
class RegisterUserView(APIView):
    """
    Представлення для реєстрації нового користувача через API.
    """

    def post(self, request) -> Response:
        """
        Обробляє POST-запит для реєстрації нового користувача.
        """
        serializer = CustomUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Повернути дані користувача"""
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    

    def put(self, request):
        """Оновити дані користувача"""
        user = request.user 
        serializer = CustomUserSerializer(user, data=request.data, partial=True) 

        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class PurchaseSubscriptionView(APIView):
    """
    View для покупки підписки користувачем.
    Підписка створюється тільки після підтвердження оплати.
    """

    def post(self, request, *args, **kwargs):
        """
        Створення підписки для користувача після підтвердження покупки.
        """

        plan_id = request.data.get('plan_id')
        service_id = request.data.get('service_id')

        try:
            plan = SubscriptionPlan.objects.get(id=plan_id)
            service = Service.objects.get(id=service_id)

        except SubscriptionPlan.DoesNotExist:
            return Response({"detail": "Subscription plan not found."}, status=status.HTTP_404_NOT_FOUND)

        except Service.DoesNotExist:
            return Response({"detail": "Service not found."}, status=status.HTTP_404_NOT_FOUND)

        if not plan.is_active:
            return Response({"detail": "The selected subscription plan is no longer active."}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        
        start_date = timezone.now().date()
        end_date = start_date + relativedelta(months=plan.duration)

        subscription = Subscription.objects.create(
            user=user,
            service=service,
            plan=plan,
            start_date=start_date,
            end_date=end_date,
            status='active', 
        )

        return Response({
            "detail": "Subscription purchased successfully.",
            "subscription_id": subscription.id,
            "service": service.name,
            "plan": plan.name,
            "start_date": start_date,
            "end_date": end_date
        }, status=status.HTTP_201_CREATED)
        
        
        
class UserSubscriptionsView(APIView):
    """
    Отримати всі підписки користувача.
    Вимагає аутентифікації за допомогою JWT.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Отримує всі підписки користувача.
        """
        user = request.user 

        subscriptions = Subscription.objects.filter(user=user)

        if subscriptions.exists():
            serializer = SubscriptionSerializer(subscriptions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "No subscriptions found."}, status=status.HTTP_404_NOT_FOUND)
