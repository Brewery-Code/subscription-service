from django.contrib import admin
from .models import Service, SubscriptionPlan, Subscription

admin.site.register(Service)
admin.site.register(SubscriptionPlan)
admin.site.register(Subscription)
