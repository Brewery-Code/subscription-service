from typing import Any
from rest_framework import serializers
from user.models import CustomUser
from subscriptions.models import Service, SubscriptionPlan
from order.models import Subscription
from core.models import FAQ


# Subscriptions app
class ServiceSerializer(serializers.ModelSerializer):
    """
    Серіалізатор для моделі Service.
    
    Поля:
    - id: Унікальний ідентифікатор сервісу.
    - name: Назва сервісу.
    - description: Опис сервісу.
    - image: Зображення сервісу.
    - bg_color: Фоновий колір сервісу.
    """
    
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'image', 'bg_color']


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    """
    Серіалізатор для моделі SubscriptionPlan.
    
    Поля:
    - id: Унікальний ідентифікатор плану підписки.
    - service: Посилання на сервіс, до якого відноситься план.
    - name: Назва плану підписки.
    - price: Ціна плану підписки.
    - duration: Тривалість плану підписки в місяцях.
    - is_active: Визначає, чи активний план.
    """
    
    class Meta:
        model = SubscriptionPlan
        fields = ['id', 'service', 'name', 'price', 'duration', 'benefits' , 'is_active']


# Order app
class SubscriptionSerializer(serializers.ModelSerializer):
    """Серіалізатор для моделі Subscription.

    Цей серіалізатор відповідає за перетворення даних підписки з і до JSON-формату.
    Він забезпечує автоматичне призначення користувача для нових підписок і не дозволяє змінювати користувача через API.
    """

    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())
    plan = serializers.PrimaryKeyRelatedField(queryset=SubscriptionPlan.objects.all())
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Subscription
        fields = ['id', 'user', 'service', 'plan', 'start_date', 'end_date', 'is_active', 'status']


    def validate(self, data: dict) -> dict:
        """
        Перевірка даних перед створенням або оновленням підписки.

        Перевіряє, що вибраний план підписки належить до вибраного сервісу. Якщо план не пов'язаний з обраним сервісом,
        викидає помилку валідації.

        Аргументи:
            data (dict): Дані, які підлягають валідації, включаючи `service` і `plan`.

        Повертає:
            dict: Перевірені дані, які можуть бути використані для створення або оновлення об'єкта підписки.

        Викидає:
            serializers.ValidationError: Якщо план не відповідає вибраному сервісу.
        """
        service = data.get('service')
        plan = data.get('plan')

        if plan and plan.service != service:
            raise serializers.ValidationError("The selected plan does not belong to the selected service.")

        return data


    def create(self, validated_data: dict) -> Subscription:
        """
        Створення нового об'єкта підписки з автоматичним призначенням користувача.

        Додає поточного користувача до даних підписки перед збереженням об'єкта в базі даних.

        Аргументи:
            validated_data (dict): Перевірені дані для створення нової підписки.

        Повертає:
            Subscription: Створений об'єкт підписки.
        """
        return super().create(validated_data)


# Core app
class FAQSerializer(serializers.ModelSerializer):
    """
    Серіалізатор для моделі FAQ.
    
    Поля:
    - id: Унікальний ідентифікатор питання.
    - question: Питання.
    - answer: Відповідь на питання.
    """
    
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer']


# User app
class CustomUserSerializer(serializers.ModelSerializer):
    """
    Серіалізатор для моделі CustomUser, який використовується для створення нового користувача
    та роботи з його даними.

    Поля:
    -----
    password : CharField
        Поле для введення паролю. Це поле є write-only, тобто не повертається у відповідях API.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'surname', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        """
        Створює нового користувача на основі перевірених даних.
        
        Перевірені дані включають:
        - email (електронна пошта)
        - name (ім'я користувача)
        - password (пароль)

        Пароль хешується перед збереженням користувача для забезпечення безпеки.
        """
        user = CustomUser(
            email=validated_data['email'],
            name=validated_data['name'],
           
        )
        # Хешування паролю
        user.set_password(validated_data['password'])
        user.save()
        return user

            