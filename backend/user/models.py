from typing import Any
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.db import models


class CustomUserManager(BaseUserManager):
    """
    Менеджер користувачів для кастомної моделі користувача.
    Цей клас визначає методи для створення звичайних користувачів та суперкористувачів.
    """
    
    def create_user(self, name, email, password=None, **extra_fields) -> Any:
        """
        Створює і зберігає новий звичайний користувач.

        :param username: Ім'я користувача.
        :param email: Адреса електронної пошти користувача.
        :param password: Пароль користувача.
        :param extra_fields: Додаткові поля, які потрібно зберегти в моделі користувача.
        :raises ValueError: Якщо електронна адреса не надана.
        :return: Створений користувач.
        """
        if not email:
            raise ValueError('The email field must be set!')
    
        email = self.normalize_email(email)
        user = self.model(name=name, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, name, email, password=None, **extra_fields) -> Any:
        """
        Створює і зберігає нового суперкористувача.

        :param username: Ім'я користувача.
        :param email: Адреса електронної пошти користувача.
        :param password: Пароль користувача.
        :param extra_fields: Додаткові поля, які потрібно зберегти в моделі користувача.
        :return: Створений суперкористувач.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(name, email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Кастомна модель користувача.

    Ця модель є розширенням `AbstractBaseUser` та `PermissionsMixin` і включає всі поля, необхідні для
    керування користувачами, включаючи аутентифікацію та права доступу.
    """
    
    name = models.CharField(max_length=150, unique=False, help_text='Ім\'я користувача.')
    surname = models.CharField(max_length=255, unique=False)
    email = models.EmailField(unique=True, help_text='Адреса електронної пошти користувача.')
    last_login = models.DateTimeField(null=True, blank=True, default=None, help_text='Останній вхід користувача.')
    date_joined = models.DateTimeField(default=timezone.now, help_text='Дата приєднання користувача.')
    is_active = models.BooleanField(default=True, help_text='Визначає, чи є користувач активним.')
    is_staff = models.BooleanField(default=False, help_text='Визначає, чи є користувач співробітником.')
    username = None
    
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self) -> str:
        """Повертає рядкове представлення користувача, яке є його іменем"""
        return self.name


