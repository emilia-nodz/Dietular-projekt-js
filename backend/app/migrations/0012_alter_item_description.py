# Generated by Django 5.1.3 on 2024-12-09 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_alter_item_allergens'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='description',
            field=models.CharField(max_length=500),
        ),
    ]
