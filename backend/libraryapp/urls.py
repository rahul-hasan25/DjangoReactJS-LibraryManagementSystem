from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('api/admin/login/', admin_login_api),
    path('api/categories/add/', add_category),
    path('api/categories/', list_categories),
    path('api/update_category/<int:id>/', update_category),
    path('api/delete_category/<int:id>/', delete_category),
]
