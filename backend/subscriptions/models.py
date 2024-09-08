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


