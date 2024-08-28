from django.dispatch import receiver
from .models import SearchHistory
from .views import *

@receiver(models.signals.post_save, sender=SearchHistory)
def save_search_history(sender, instance, created, **kwargs):
    if created and instance.user.is_authenticated:
        PerformSearch(instance.query, instance.user)