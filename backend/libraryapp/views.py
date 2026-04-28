from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password
from django.db.models import Q


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
    
    
    
# <----------BOOK---------->
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def add_book(request):
    title       = request.data.get('title')
    author_id   = request.data.get('author')
    category_id = request.data.get('category')
    isbn        = request.data.get('isbn')
    price       = request.data.get('price')
    quantity    = request.data.get('quantity')
    cover_image = request.FILES.get('cover_image')
    
    author   = Author.objects.get(id=author_id)
    category = Category.objects.get(id=category_id)
    
    if Book.objects.filter(isbn=isbn).exists():
        return Response(
            {
                'success': False,
                'message': "Book with this ISBN already exists. Please use a different ISBN"
            }, status=status.HTTP_400_BAD_REQUEST )
    
    book = Book.objects.create(
        title       = title,
        author      = author,
        category    = category,
        isbn        = isbn,
        price       = price,
        quantity    = quantity,
        cover_image = cover_image
    )
    serializer = BookSerializer(book)
    
    return Response(
        {
            'success' : True,
            'message' : 'Book has been created!',
            'book'    : serializer.data,
        }, status = status.HTTP_201_CREATED)



@api_view(['GET'])
def list_books(request):
    books      = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])
def update_book(request,id):
    book = get_object_or_404(Book, id=id)
    
    title       = request.data.get('title')
    author_id   = request.data.get('author')
    category_id = request.data.get('category')
    price       = request.data.get('price')
    quantity    = request.data.get('quantity')
    cover_image = request.FILES.get('cover_image')
    
    author   = Author.objects.get(id=author_id)
    category = Category.objects.get(id=category_id)
    
    book.title    = title
    book.author   = author
    book.category = category
    book.price    = price
    book.quantity = quantity
    
    if cover_image:
        book.cover_image = cover_image
    book.save()
    
    serializer = BookSerializer(book)
    
    return Response(
        {
            'success' : True,
            'message' : 'Book has been Updated!',
            'book'    : serializer.data
        }, status = status.HTTP_200_OK)


@api_view(['DELETE'])
def delete_book(request,id):
    book = get_object_or_404(Book, id=id)
    book.delete()
    
    return Response(
        {
            'success' : True,
            'message' : "Book deleted successfully!"
        }, 
        status = status.HTTP_200_OK
    )
    


# ADMIN Change Password
@api_view(['POST'])
def admin_change_password(request):
    username         = request.data.get('username')
    current_password = request.data.get('current_password')
    new_password     = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')
    
    if new_password != confirm_password:
        return Response(
            {
                "success" : False,
                "message" : "New password and Confirm do not match!"
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if len(new_password) < 6:
        return Response(
            {
                "success" : False,
                "message" : "New password must be at least 6 character long!"
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = User.objects.get(username=username, is_staff=True)
    except User.DoesNotExist:
        return Response(
            {
                "success" : False,
                "message" : "Admin User does not exist!"
            },
            status=status.HTTP_404_NOT_FOUND
        )
    
    if not user.check_password(current_password):
        return Response(
            {
                "success" : False,
                "message" : "Current Password is incorrect!"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    user.set_password(new_password)
    user.save()
    
    return Response(
        {
            "success" : True,
            "message" : "Changed Password Successfully!"
        },
        status=status.HTTP_200_OK
    )
    
    

#USER Signup
@api_view(['POST'])
def user_signup(request):
    full_name        = request.data.get('full_name')
    mobile           = request.data.get('mobile')
    email            = request.data.get('email')
    password         = request.data.get('password')
    confirm_password = request.data.get('confirm_password')
    
    if password != confirm_password:
        return Response(
            {
                'success' : False,
                'message' : 'Password and Confirm Password do not match!'
            },
            status= status.HTTP_400_BAD_REQUEST
        )
    
    if len(password) < 6:
        return Response(
            {
                'success' : False,
                'message' : 'Password must be at least 6 characters long!'
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    last_student = Student.objects.all().order_by('-id').first()
    if last_student and last_student.student_id.isdigit():
        new_id_int = int(last_student.student_id) + 1
    else:
        new_id_int = 1001
        
    student_id = str(new_id_int)
    
    if Student.objects.filter(email=email).exists():
        return Response(
            {
                'success' : False,
                'message' : 'User with this email already exists. Please use a different email'
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
    hashed_password = make_password(password)
    
    student = Student.objects.create(
        student_id = student_id,
        full_name  = full_name,
        mobile     = mobile,
        email      = email,
        password   = hashed_password,
        is_active  = True
    )
    
    return Response(
        {
            'success' : True,
            'message' : 'User registered successfully!',
            'student_id' : student.student_id,
            'full_name' : student.full_name
        },
        status=status.HTTP_201_CREATED
    )
    

#USER Login
@api_view(['POST'])
def user_login(request):
    login_id = request.data.get('login_id')
    password = request.data.get('password')
    
    try:
        if '@' in login_id:
            student = Student.objects.get(email=login_id)
        else:
            student = Student.objects.get(student_id=login_id)
    except Student.DoesNotExist:
        return Response(
            {
                'success' : False,
                'message' : 'Invalid login credentials'
            },
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    if not check_password(password, student.password):
        return Response(
            {
                'success' : False,
                'message' : 'Invalid login credentials'
            },
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    if not student.is_active:
        return Response(
            {
                'success' : False,
                'message' : 'User account is inactive. Please contact Admin'
            },
            status=status.HTTP_403_FORBIDDEN
        )
        
    return Response(
        {
            'success' : True,
            'message' : 'Login Successful!',
            'student_id' : student.student_id,
            'full_name' : student.full_name,
            'email' : student.email
        },
        status=status.HTTP_200_OK
    )
    

#  <-----Student Navbar------>
# User Dashboard
@api_view(['GET'])
def user_stats(request):
    student_id = request.query_params.get('student_id')
    
    try:
        student = Student.objects.get(student_id=student_id)
    except Student.DoesNotExist:
        return Response(
            {
                'success' : False,
                'message' : 'Student not found'
            },
            status=status.HTTP_404_NOT_FOUND
        )
    
    total_books = Book.objects.count()
    total_issued = IssuedBook.objects.filter(student=student).count()
    not_returned = IssuedBook.objects.filter(student=student, is_returned=False).count()
    
    stats = {
        'total_books' : total_books,
        'total_issued' : total_issued,
        'not_returned' : not_returned
    }
    
    return Response(
        {
            'success' : True,
            'stats' : stats
        },
        status=status.HTTP_200_OK
    )