from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from .models import Recipe, Ingredient, Direction, Likes
from django.contrib.auth.models import User
from django.urls import reverse

# Create your views here.
@login_required
def add_recipe(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')
        categories = request.POST.get('categories')
        photo = request.FILES.get('photo')
        video = request.FILES.get('video')
        preparation_time = request.POST.get('preparation_time')
        cooking_time = request.POST.get('cooking_time')
        visibility = request.POST.get('visibility')
        user = request.user

        # Create the Recipe object
        recipe = Recipe.objects.create(
            name=name,
            description=description,
            categories=categories,
            photo=photo,
            video=video,
            preparation_time=preparation_time,
            cooking_time=cooking_time,
            visibility=visibility,
            user=user
        )

        # Process Ingredients
        ingredient_names = request.POST.getlist('ingredient_name[]')
        ingredient_quantities = request.POST.getlist('ingredient_quantity[]')
        for name, quantity in zip(ingredient_names, ingredient_quantities):
            if name and quantity:
                Ingredient.objects.create(recipe=recipe, name=name, quantity=quantity)

        # Process Directions
        direction_steps = request.POST.getlist('direction_step[]')
        direction_photos = request.FILES.getlist('direction_photo[]')

        # If there are fewer photos than steps, extend the photos list with None
        # while len(direction_photos) < len(direction_steps):
        #     direction_photos.append(None)

        for step, photo in zip(direction_steps, direction_photos):
            if step:
                Direction.objects.create(recipe=recipe, step=step, photo=photo if photo else None)

        return redirect('recipe_detail', pk=recipe.pk)

    return render(request, 'addrecipe.html')

def recipe_detail(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    return render(request, 'recipe_detail.html', {'recipe': recipe})

def like(request, post_id):
    user = request.user
    post = Recipe.objects.get(id = post_id)
    current_likes = post.likes
    liked = Likes.objects.filter(user=user,post=post).count()
    if not liked:
        like = Likes.objects.create(user=user, post=post)
        current_likes = current_likes + 1
        
    else:
        Likes.objects.filter(user=user, post=post).delete()
        current_likes = current_likes - 1
        
    post.likes = current_likes
    post.save()
    
    return HttpResponseRedirect(reverse('recipe_detail',args =[post_id]))
    