# Generated by Django 5.0.2 on 2024-06-01 08:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cook', '0003_alter_profile_about'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='picture',
            field=models.ImageField(default='img/profile/default.png', upload_to='profile_pictures/'),
        ),
    ]
