from django.db import models
from django.core.exceptions import ValidationError
import os
from django.utils.text import slugify
from django.dispatch import receiver


def upload_to(instance, filename) -> str:
    """
    Генерує шлях завантаження для файлу зображення.

    :param instance: Екземпляр моделі, до якої прив'язано файл.
    :param filename: Оригінальне ім'я файлу.
    :return: Шлях до директорії, в яку буде завантажено файл.
    """
    ext = filename.split('.')[-1]
    filename = f"{slugify(instance.name)}.{ext}"
    return os.path.join('product', filename)

class Service(models.Model):
    """
    Модель БД для зберігання основної інформації про сервіс.

    Поля:
    - name: Назва сервісу.
    - description: Опис сервісу.
    - image: Зображення сервісу.
    - bg_color: Фоновий колір (необов'язкове поле).
    """
    
    name = models.CharField(max_length=255, help_text="Назва сервісу.")
    description = models.TextField(help_text="Опис сервісу.")
    image = models.FileField(upload_to=upload_to, null=False, help_text="Зображення сервісу.")
    bg_color = models.CharField(max_length=50, blank=True, help_text="Фоновий колір.")

    class Meta:
        db_table = 'services_table'
        verbose_name = 'Service'
        verbose_name_plural = 'Services'

    def __str__(self) -> str:
        """
        Повертає рядкове представлення сервісу, яке є його назвою.
        """
        return self.name


class SubscriptionPlan(models.Model):
    """
    Модель БД для зберігання даних про тарифний план підписки та сервіс.

    Поля:
    - service: Зв'язок з моделлю Service.
    - name: Назва тарифного плану.
    - benefits: Список переваг тарифного плану.
    - price: Ціна підписки.
    - duration: Тривалість підписки в місяцях.
    - is_active: Визначає, чи активний план.
    """
    
    PLAN_CHOICES = [
        ('basic', 'Basic'),
        ('standard', 'Standard'),
        ('premium', 'Premium'),
    ]

    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='plans', help_text="Сервіс, до якого відноситься план.")
    name = models.CharField(max_length=50, choices=PLAN_CHOICES, help_text="Назва тарифного плану.")
    benefits = models.JSONField(default=list, blank=True, help_text="Переваги тарифного плану.")
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Ціна підписки.")
    duration = models.PositiveIntegerField(help_text="Тривалість підписки в місяцях (наприклад, 1, 6, 12).")
    is_active = models.BooleanField(default=True, help_text="Визначає, чи активний план.")
    
    class Meta:
        db_table = 'subscriptions_plan_table'
        verbose_name = 'Subscription Plan'
        verbose_name_plural = 'Subscription Plans'

    def __str__(self) -> str:
        """
        Повертає рядкове представлення тарифного плану, яке включає назву сервісу,
        назву плану і тривалість у місяцях.
        """
        return f"{self.service.name} - {self.get_name_display()} ({self.duration} months)"


@receiver(models.signals.post_delete, sender=Service)
def auto_delete_file_on_delete(sender, instance, **kwargs) -> None:
    """
    Видаляє файл зображення при видаленні об'єкта сервісу.

    :param sender: Модель, яка надіслала сигнал.
    :param instance: Екземпляр моделі, з якого потрібно видалити файл.
    :param kwargs: Додаткові параметри.
    """
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)
