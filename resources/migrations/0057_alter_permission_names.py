# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-06-12 14:27
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0056_remove_unit_dependency_on_timezone_configuration'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='resourcegroup',
            options={'ordering': ('name',), 'permissions': [('group:can_approve_reservation', 'Can approve reservation'), ('group:can_make_reservations', 'Can make reservations'), ('group:can_view_reservation_access_code', 'Can view reservation access code'), ('group:can_view_reservation_extra_fields', 'Can view reservation extra fields'), ('group:can_access_reservation_comments', 'Can access reservation comments'), ('group:can_view_reservation_catering_orders', 'Can view reservation catering orders')], 'verbose_name': 'Resource group', 'verbose_name_plural': 'Resource groups'},
        ),
        migrations.AlterModelOptions(
            name='unit',
            options={'ordering': ('name',), 'permissions': [('unit:can_approve_reservation', 'Can approve reservation'), ('unit:can_make_reservations', 'Can make reservations'), ('unit:can_view_reservation_access_code', 'Can view reservation access code'), ('unit:can_view_reservation_extra_fields', 'Can view reservation extra fields'), ('unit:can_access_reservation_comments', 'Can access reservation comments'), ('unit:can_view_reservation_catering_orders', 'Can view reservation catering orders')], 'verbose_name': 'unit', 'verbose_name_plural': 'units'},
        ),
    ]
