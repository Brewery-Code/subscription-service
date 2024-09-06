from django.db import models
from django.core.exceptions import ValidationError


class Service(models.Model):
    """Модель БД для зберігання основної інформації про сервіс"""
    
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.FileField(upload_to='images/', null=False)

    class Meta:
        db_table = 'services_table'

    def __str__(self) -> str:
        return self.name


class SubscriptionPlan(models.Model):
    """Модель БД для зберігання даних про тарифний план підписки та сервіс"""
    
    PLAN_CHOICES = [
        ('basic', 'Basic'),
        ('standard', 'Standard'),
        ('premium', 'Premium'),
    ]

    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='plans')
    name = models.CharField(max_length=50, choices=PLAN_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.PositiveIntegerField(help_text="Duration in months (e.g., 1, 6, 12)")
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'subscriptions_plan_table'
    
    def __str__(self) -> str:
        return f"{self.service.name} - {self.get_name_display()} ({self.duration} months)"


class Subscription(models.Model):
    """Модель БД для зберігання даних про підписки користувача"""
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')

    class Meta:
        db_table = 'subscriptions_table'

    def clean(self) -> None:
        """Перевірка, що дата завершення підписки більша за дату початку"""
        if self.end_date <= self.start_date:
            raise ValidationError("End date must be greater than start date.")
    
    def __str__(self) -> str:
        return f"{self.user.username} - {self.service.name} ({self.plan.name})"
