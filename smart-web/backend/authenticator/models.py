
# backend/authenticator/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Create and return a regular user with an email and password.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and return a superuser with an email, password, and other fields.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True, max_length=100)
    is_active = models.BooleanField(default=False)
    
    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        # Set username equal to the email
        self.username = self.email

        # Set is_active to True for superusers
        if self.is_superuser:
            self.is_active = True

        super().save(*args, **kwargs)


class SearchHistory(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    query = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    link = models.URLField()

    def __str__(self):
        return f"{self.user.username} - {self.query} - {self.timestamp} - {self.link}"


from django.db import models

class Result(models.Model):
    # user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=1)
    title = models.CharField(max_length=255)
    query = models.CharField(max_length=255 )
    links = models.CharField(max_length=255 )
    snippets = models.CharField(max_length=255)
    sites = models.CharField(max_length=255)
    sitelinks = models.CharField(max_length=255)
    rank = models.IntegerField(null=True) 
    created = models.DateTimeField(auto_now_add=True)  
    relevance = models.IntegerField(default=0)  
    html= models.TextField()

    def __str__(self):
        return self.title  
