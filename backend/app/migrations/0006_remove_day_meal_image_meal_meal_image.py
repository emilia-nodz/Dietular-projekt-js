# Generated by Django 5.1.3 on 2024-11-28 08:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_day_meal_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='day',
            name='meal_image',
        ),
        migrations.AddField(
            model_name='meal',
            name='meal_image',
            field=models.ImageField(default='./meal_icon.jpg', upload_to='meal_images/'),
        ),
    ]
