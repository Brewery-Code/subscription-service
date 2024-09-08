from django import forms
from django.contrib import admin
from django.utils.html import format_html
from .models import Service, SubscriptionPlan
import json

class JSONListWidget(forms.Textarea):
    def render(self, name, value, attrs=None, renderer=None):
        if value is None:
            value = "[]"
        try:
            value = json.dumps(json.loads(value), indent=4, ensure_ascii=False)
        except (ValueError, TypeError):
            pass
        return super().render(name, value, attrs, renderer)

class SubscriptionPlanAdminForm(forms.ModelForm):
    benefits = forms.CharField(widget=JSONListWidget)

    class Meta:
        model = SubscriptionPlan
        fields = '__all__'

class SubscriptionPlanAdmin(admin.ModelAdmin):
    form = SubscriptionPlanAdminForm

admin.site.register(SubscriptionPlan, SubscriptionPlanAdmin)
admin.site.register(Service)


