from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('api/admin/login/', admin_login_api)
]
