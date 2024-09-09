from django.db import models


class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    
    class Meta:
        db_table = 'FAQ'
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'
        
    def __str__(self) -> str:
        return self.question
