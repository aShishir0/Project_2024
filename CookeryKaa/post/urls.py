from django.urls import path
from . import views

urlpatterns = [
    path('addrecipe/', views.add_recipe, name='add_recipe'),
    path('recipe/<int:pk>/', views.recipe_detail, name='recipe_detail'),
    path('like/<int:post_id>/', views.like, name='like'),
    path('addReaction/', views.addReaction, name='addReaction'),
    path('addComment/', views.addComment, name='addComment'),
    path('addRating/', views.addRating, name='addRating'),
]
