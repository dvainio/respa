# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-22 16:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0046_access_code_nullable'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='period',
            name='exception',
        ),
        migrations.RemoveField(
            model_name='period',
            name='parent',
        ),
        migrations.AlterField(
            model_name='period',
            name='name',
            field=models.CharField(blank=True, default='', max_length=200, verbose_name='Name'),
        ),
    ]
