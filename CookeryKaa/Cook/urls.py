from django.urls import path
from . import views

urlpatterns = [
    path('',views.index, name='index'),
    # path('login/',views.handle_login, name='handle_login'),
    # path('signup/',views.handle_signup, name = "handle_signup")
    # path('addrecipe/',views.addrecipe, name ='addrecipe'),
    path('myprofile/',views.myprofile,name='myprofile'),
    path('feed/',views.feed,name='feed')
]
