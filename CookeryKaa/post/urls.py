from django.urls import path
from .views import add_recipe, recipe_detail

urlpatterns = [
    path('addrecipe/', add_recipe, name='add_recipe'),
    path('recipe/<int:pk>/', recipe_detail, name='recipe_detail'),
]