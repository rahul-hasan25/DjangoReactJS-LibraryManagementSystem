from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
from django.shortcuts import get_object_or_404


@api_view(['GET','POST'])
def admin_login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user is not None and user.is_staff:
        return Response(
            {
                "success" : True,
                "message" : "Login Successful!",
                "username": username,
            },
            status=200
        )
        
    return Response(
        {
            "success" : False,
            "message" : "Invalid Credentials",
        },
        status=401
    )



# Book Category
@api_view(['POST'])
def add_category(request):
    if request.method == 'POST':
        name            = request.data.get('name')
        category_status = request.data.get('status','1')
        
        if not name:
            return Response({
                'success': False,
                'message': 'Name is required'
            }, status=400)
        
        is_active  = True if str(category_status) == '1' else False
        category   = Category.objects.create(name=name, is_active=is_active)
        serializer = CategorySerializer(category)
        
        return Response(
            {
                'success' : True,
                'message' : 'Category has been created!',
                'category': serializer.data,
            }, status = status.HTTP_201_CREATED)
        
    
@api_view(['GET'])
def list_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def update_category(request, id):
    category        = get_object_or_404(Category, id=id)
    name            = request.data.get('name')
    category_status = request.data.get('status')
    
    is_active  = True if str(category_status) == '1' else False
    
    category.name      = name
    category.is_active = is_active
    category.save()
    
    serializer = CategorySerializer(category)
    
    return Response(
        {
            'success' : True,
            'message' : 'Category has been Updated!',
            'category': serializer.data,
        }, status = status.HTTP_200_OK)
    


@api_view(['DELETE'])
def delete_category(request, id):
    category = get_object_or_404(Category, id=id)
    category.delete()
    
    return Response(
        {
            'success' : True,
            'message' : 'Category deleted successfully!',
        }, status = status.HTTP_200_OK)
    
    

# <---------AUTHOR-------->
@api_view(['POST'])
def add_author(request):
    name   = request.data.get('name')
    
    author     = Author.objects.create(name=name)
    serializer = AuthorSerializer(author)
    
    return Response(
        {
            'success' : True,
            'message' : 'Author has been created!',
            'author'  : serializer.data,
        }, status = status.HTTP_201_CREATED)
    


@api_view(['GET'])
def list_authors(request):
    authors    = Author.objects.all()
    serializer = AuthorSerializer(authors, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['PUT'])
def update_author(request, id):
    author = get_object_or_404(Author, id=id)
    name   = request.data.get('name')
    
    author.name = name
    author.save()
    
    serializer = AuthorSerializer(author)
    
    return Response(
        {
            'success' : True,
            'message' : 'Author has been Updated!',
            'category': serializer.data,
        }, status = status.HTTP_200_OK)



@api_view(['DELETE'])
def delete_author(request, id):
    author = get_object_or_404(Author, id=id)
    author.delete()
    
    return Response(
        {
            'success' : True,
            'message' : 'Author deleted successfully!',
        }, status = status.HTTP_200_OK)