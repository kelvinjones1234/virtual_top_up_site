# Generated by Django 5.0.3 on 2024-06-08 01:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_notification'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notification',
            old_name='users',
            new_name='user',
        ),
    ]
