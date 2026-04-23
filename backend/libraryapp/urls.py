from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    #ADMIN Login
    path('api/admin/login/', admin_login_api),
    #ADMIN Category
    path('api/categories/add/', add_category),
    path('api/categories/', list_categories),
    path('api/update_category/<int:id>/', update_category),
    path('api/delete_category/<int:id>/', delete_category),
    #ADMIN Author
    path('api/authors/add/', add_author),
    path('api/authors/', list_authors),
    path('api/update_author/<int:id>/', update_author),
    path('api/delete_author/<int:id>/', delete_author),
    #ADMIN Book
    path('api/books/add/', add_book),
    path('api/books/', list_books),
]
