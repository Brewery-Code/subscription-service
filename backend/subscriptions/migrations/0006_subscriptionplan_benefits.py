# Generated by Django 5.1.1 on 2024-09-08 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0005_alter_service_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscriptionplan',
            name='benefits',
            field=models.JSONField(blank=True, default=list),
        ),
    ]