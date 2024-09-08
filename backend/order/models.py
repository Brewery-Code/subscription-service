from django.db import models
from subscriptions.models import Service, SubscriptionPlan

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
