from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'faq', views.FAQViewSet)
router.register(r'services', views.ServiceViewSet)
router.register(r'subscription-plans', views.SubscriptionPlanViewSet)
router.register(r'subscriptions', views.SubscriptionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.RegisterUserView.as_view()),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('user/purchase_subscription/', views.PurchaseSubscriptionView.as_view()),
    path('user/subscriptions/', views.UserSubscriptionsView.as_view())
]
