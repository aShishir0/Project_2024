from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import UserUpdateForm, ProfileUpdateForm
from django.contrib.auth.hashers import check_password
from .models import Profile
from .models import Post, Reaction, Comment, Rating

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
        #Creating a profile object
        Profile.objects.create(user=my_user)
        messages.success(request,"User Created Successfuly")
        return redirect('index')


def handle_login(request):
    if request.method =="POST":
        email = request.POST.get('email')
        pass1 = request.POST.get('password')
        user = authenticate(request,email=email,password=pass1)
        if user is not None:
            login(request,user)
            return redirect('index')
            #return redirect('index')
        else:
            #return HttpResponse("Username or password incorrect")
            messages.error(request,"Username or Password Incorrect")
            return redirect('index')
        

def addrecipe(request):
    return render(request,'Addrecipe.html')

def myprofile(request):
    return render(request,'profile.html')

def bookmark(request):
    return render(request,'bookmark.html')

def feed(request):
    return render(request,'feed.html')

def logout_view(request):
    logout(request)
    # Redirect to a specific page after logout
    return redirect('index')

@login_required
def editprofile(request):
    user = request.user
    profile, created = Profile.objects.get_or_create(user=user)

    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        bio = request.POST.get('bio')
        about = request.POST.get('about')
        phone = request.POST.get('phone')
        gender = request.POST.get('gender')
        picture = request.FILES.get('picture')

        user.username = username
        user.email = email
        user.save()

        profile.bio = bio
        profile.about = about
        profile.phone = phone
        profile.gender = gender

        if picture:
            profile.picture = picture

        profile.save()

        messages.success(request, 'Your profile was successfully updated!')
        return render(request,'profile.html')

    return render(request, 'settings.html', {
        'user': user,
        'profile': profile
    })

@login_required
def change_password(request):
    if request.method == 'POST':
        old_password = request.POST.get('current_password')
        new_password = request.POST.get('new_password')
        repeat_password = request.POST.get('repeat_password')

        user = request.user

        # Validate old password
        if not check_password(old_password, user.password):
            messages.error(request, 'Your old password is incorrect.')
            return render(request,'settings.html')

        # Validate new password and repeated new password
        if new_password != repeat_password:
            messages.error(request, 'New password and repeat password do not match.')
            return render(request,'settings.html')

        # Update password
        user.set_password(new_password)
        user.save()
        update_session_auth_hash(request, user)  # Important!
        messages.success(request, 'Your password was successfully updated!')
        return render(request,'settings.html')
    else:
        return render(request,'settings.html')  # Redirect to profile settings page if accessed via GET request
    
def feed(request):
    user_profile = get_object_or_404(Profile, user=request.user)
    return render(request, 'feed.html', {'user_profile': user_profile})

def add_reaction(request):
    if request.method == "POST":
        post_id = request.POST.get('post_id')
        reaction_type = request.POST.get('reaction_type')
        post = get_object_or_404(Post, id=post_id)
        reaction, created = Reaction.objects.get_or_create(post=post, user=request.user, defaults={'reaction_type': reaction_type})
        if not created:
            reaction.reaction_type = reaction_type
            reaction.save()
        reaction_count = Reaction.objects.filter(post=post).count()
        return JsonResponse({'reaction_count': reaction_count})

def add_comment(request):
    if request.method == "POST":
        post_id = request.POST.get('post_id')
        content = request.POST.get('content')
        post = get_object_or_404(Post, id=post_id)
        comment = Comment.objects.create(post=post, user=request.user, content=content)
        comment.save()
        comments_count = Comment.objects.filter(post=post).count()
        return JsonResponse({'comments_count': comments_count, 'comment': comment.content, 'username': comment.user.username})
    
def add_rating(request):
    if request.method == "POST":
        post_id = request.POST.get('post_id')
        rating_value = int(request.POST.get('rating'))
        post = get_object_or_404(Post, id=post_id)
        rating, created = Rating.objects.get_or_create(post=post, user=request.user, defaults={'rating': rating_value})
        if not created:
            rating.rating = rating_value
            rating.save()
        average_rating = Rating.objects.filter(post=post).aggregate(models.Avg('rating'))['rating__avg']
        return JsonResponse({'average_rating': average_rating})
