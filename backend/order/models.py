from django.db import models
from django.core.exceptions import ValidationError
from subscription_service import settings
from subscriptions.models import Service, SubscriptionPlan


class Subscription(models.Model):
    """
    Модель БД для зберігання даних про підписки користувача.

    Поля:
    - user: Користувач, який має підписку (ForeignKey на модель користувача).
    - service: Сервіс, до якого відноситься підписка (ForeignKey на модель Service).
    - plan: Тарифний план підписки (ForeignKey на модель SubscriptionPlan).
    - start_date: Дата початку підписки.
    - end_date: Дата завершення підписки.
    - is_active: Визначає, чи активна підписка.
    - status: Статус підписки (active, paused, cancelled).
    """
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, help_text="Користувач, який має підписку.")
    service = models.ForeignKey(Service, on_delete=models.CASCADE, help_text="Сервіс, до якого відноситься підписка.")
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE, help_text="Тарифний план підписки.")
    start_date = models.DateField(help_text="Дата початку підписки.")
    end_date = models.DateField(help_text="Дата завершення підписки.")
    is_active = models.BooleanField(default=True, help_text="Визначає, чи активна підписка.")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active', help_text="Статус підписки.")


    class Meta:
        db_table = 'subscriptions_table'
        verbose_name = 'Subscription'
        verbose_name_plural = 'Subscriptions'


    def clean(self) -> None:
        """
        Перевірка, що дата завершення підписки більша за дату початку.
        
        :raises ValidationError: Якщо дата завершення менша або дорівнює даті початку.
        """
        if self.end_date <= self.start_date:
            raise ValidationError("End date must be greater than start date.")
    
    
    def __str__(self) -> str:
        """
        Повертає рядкове представлення підписки, яке включає ім'я користувача, назву сервісу
        і назву плану.
        
        :return: Рядкове представлення підписки.
        """
        return f"{self.user.username} - {self.service.name} ({self.plan.name})"
