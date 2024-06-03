from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('',views.index, name='index'),
    # path('login/',views.handle_login, name='handle_login'),
    # path('signup/',views.handle_signup, name = "handle_signup")
    path('addrecipe/',views.addrecipe, name ='addrecipe'),
    path('myprofile/',views.myprofile,name='profile'),
    path('bookmark/', views.bookmark, name='bookmark'),
    path('feed/',views.feed,name='feed'),
    path('logout/',views.logout_view, name='logout'),
    path('editprofile/',views.editprofile, name='editprofile'),
    path('change_password/', views.change_password,name='change_password'),
    path('add_reaction/', views.add_reaction, name='add_reaction'),
    path('add_comment/', views.add_comment, name='add_comment'),
    path('add_rating/', views.add_rating, name='add_rating'),
]
