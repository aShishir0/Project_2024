from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib import messages

# Create your views here.
def index(request):
    if request.method == 'POST':
        if 'register' in request.POST:
            return handle_register(request)
        elif 'login' in request.POST:
            return handle_login(request)
        # Add an else block to handle any other POST request
        else:
            messages.error(request, "Invalid request")
            return redirect('index')
    return render(request, 'index.html')


def handle_register(request):
    if request.method == 'POST':
        uname = request.POST.get('username')
        email = request.POST.get('email')
        pass1 = request.POST.get('password1')
        pass2 = request.POST.get('password2')
        
        if pass1 != pass2:
            messages.error(request, "Passwords do not match")
            return redirect('index')
        
        if User.objects.filter(username=uname).exists():
            messages.error(request,"Username already taken")
            return redirect('index')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already used")
            return redirect('index')
        
        my_user = User.objects.create_user(uname,email,pass1)
        my_user.save()
        messages.success(request,"User Created Successfuly")
        return redirect('index')


def handle_login(request):
    if request.method =="POST":
        email = request.POST.get('email')
        pass1 = request.POST.get('password')
        user = authenticate(request,email=email,password=pass1)
        if user is not None:
            login(request,user)
            return HttpResponse("Login Successful")
            #return redirect('index')
        else:
            #return HttpResponse("Username or password incorrect")
            messages.error(request,"Username or Password Incorrect")
            return redirect('index')
        

def addrecipe(request):
    return render(request,'Addrecipe.html')

def myprofile(request):
    return render(request,'profile.html')

def feed(request):
    return render(request,'feed.html')