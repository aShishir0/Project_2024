# Generated by Django 5.0.2 on 2024-06-01 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cook', '0002_profile_about_profile_bio_profile_gender_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='about',
            field=models.TextField(blank=True, null=True),
        ),
    ]
