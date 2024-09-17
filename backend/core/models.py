from django.db import models


class FAQ(models.Model):
    """
    Модель для зберігання питань та відповідей (FAQ) в базі даних.

    Атрибути:
    ----------
    question : CharField
        Поле для зберігання питання. Має максимальну довжину 255 символів.
    
    answer : TextField
        Поле для зберігання відповіді на питання. Містить текст будь-якої довжини.
    
    """
    
    question = models.CharField(max_length=255)
    answer = models.TextField()

    class Meta:
        db_table = 'FAQ'
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'

    def __str__(self) -> str:
        """
        Повертає питання як рядкове представлення об'єкта.
        """
        return self.question
