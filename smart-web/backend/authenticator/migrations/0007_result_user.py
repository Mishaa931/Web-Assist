# Generated by Django 4.1.2 on 2023-12-24 16:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authenticator', '0006_rename_htmlcontent_result_html'),
    ]

    operations = [
        migrations.AddField(
            model_name='result',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
