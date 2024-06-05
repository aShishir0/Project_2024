from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from .models import Recipe, Ingredient, Direction, Likes
from django.contrib.auth.models import User
from django.urls import reverse
from .models import Post, Reaction, Comment, Rating

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

        ingredient_names = request.POST.getlist('ingredient_name[]')
        ingredient_quantities = request.POST.getlist('ingredient_quantity[]')
        for name, quantity in zip(ingredient_names, ingredient_quantities):
            if name and quantity:
                Ingredient.objects.create(recipe=recipe, name=name, quantity=quantity)

        direction_steps = request.POST.getlist('direction_step[]')
        direction_photos = request.FILES.getlist('direction_photo[]')

        for step, photo in zip(direction_steps, direction_photos):
            if step:
                Direction.objects.create(recipe=recipe, step=step, photo=photo if photo else None)

        return redirect('recipe_detail', pk=recipe.pk)

    return render(request, 'addrecipe.html')

def recipe_detail(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    return render(request, 'recipe_detail.html', {'recipe': recipe})

@login_required
def like(request, post_id):
    user = request.user
    post = Recipe.objects.get(id=post_id)
    liked = Likes.objects.filter(user=user, recipe=post).count()
    if not liked:
        Likes.objects.create(user=user, recipe=post)
    else:
        Likes.objects.filter(user=user, recipe=post).delete()
    return HttpResponseRedirect(reverse('recipe_detail', args=[post_id]))

def add_reaction(request):
    if request.method == 'POST':
        post_id = request.POST.get('post_id')
        reaction_type = request.POST.get('reaction_type')
        user = request.user
        post = get_object_or_404(Post, id=post_id)
        reaction, created = Reaction.objects.get_or_create(user=user, post=post, reaction_type=reaction_type)
        reaction.save()
        response = {
            'reaction_count': post.reactions.count()
        }
        return JsonResponse(response)

def add_comment(request):
    if request.method == 'POST':
        post_id = request.POST.get('post_id')
        content = request.POST.get('content')
        user = request.user
        post = get_object_or_404(Post, id=post_id)
        comment = Comment.objects.create(user=user, post=post, content=content)
        response = {
            'comments_count': post.comments.count(),
            'username': user.username,
            'comment': content
        }
        return JsonResponse(response)

def add_rating(request):
    if request.method == 'POST':
        post_id = request.POST.get('post_id')
        rating = int(request.POST.get('rating'))
        user = request.user
        post = get_object_or_404(Post, id=post_id)
        Rating.objects.create(user=user, post=post, rating=rating)
        average_rating = post.ratings.aggregate(Avg('rating'))['rating__avg']
        response = {
            'average_rating': average_rating
        }
        return JsonResponse(response)
