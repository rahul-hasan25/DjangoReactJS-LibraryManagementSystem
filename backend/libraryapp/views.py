from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *


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