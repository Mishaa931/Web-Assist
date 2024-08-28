# backend/authenticator/management/commands/check_active_users.py
from django.core.management.base import BaseCommand
from django.contrib.sessions.models import Session
from django.utils import timezone
from authenticator.models import CustomUser

class Command(BaseCommand):
    help = 'Check active users'

    def handle(self, *args, **options):
        active_sessions = Session.objects.filter(expire_date__gt=timezone.now())
        active_user_ids = [session.get_decoded().get('_auth_user_id', None) for session in active_sessions]
        active_users = CustomUser.objects.filter(id__in=active_user_ids)

        usernames = [user.username for user in active_users]

        self.stdout.write(self.style.SUCCESS('Active Users: {}'.format(usernames)))
