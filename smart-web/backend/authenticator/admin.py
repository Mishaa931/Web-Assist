# backend/authenticator/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

class CustomUserAdmin(UserAdmin):
    # Customize the display fields if needed
    list_display = ('first_name', 'last_name', 'username', 'email', 'is_active', 'is_staff')

admin.site.register(CustomUser, CustomUserAdmin)

admin.site.register(SearchHistory)
admin.site.register(Result)
