from django.urls import path
from . import views

urlpatterns = [
    path('addrecipe/', views.add_recipe, name='add_recipe'),
    path('recipe/<int:pk>/', views.recipe_detail, name='recipe_detail'),
    path('like/<int:post_id>/', views.like, name='like'),
    path('addreaction/', views.add_reaction, name='add_reaction'),
    path('addcomment/', views.add_comment, name='add_comment'),
    path('addrating/', views.add_rating, name='add_rating'),
]
