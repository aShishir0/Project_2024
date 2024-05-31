document.addEventListener('DOMContentLoaded', function() {
const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('ratingValue');
let currentRating = 0;
let count = 0;

function react() {
  const loveButton = document.getElementById('love');
  const heartIcon = loveButton.querySelector('.heart-fill'); 

  if (!heartIcon.classList.contains('filled')) {
    count++;
    document.getElementById('reaction_count').textContent = count;
    heartIcon.classList.add('filled');
    heartIcon.setAttribute('name', 'heart'); 
  } else {
    count--;
    document.getElementById('reaction_count').textContent = count;
    heartIcon.classList.remove('filled');
    heartIcon.setAttribute('name', 'heart-outline'); 
  }
}

stars.forEach(star => {
   star.addEventListener('click', setRating);
   star.addEventListener('mouseover', hoverRating);
   star.addEventListener('mouseout', resetHover);
});

function setRating(event) {
   currentRating = event.target.getAttribute('data-value');
   updateStars();
   ratingValue.textContent = `You rated: ${currentRating} stars`;
}

function hoverRating(event) {
   const hoverValue = event.target.getAttribute('data-value');
   updateStars(hoverValue);
}

function resetHover() {
   updateStars();
}

function updateStars(value = currentRating) {
   stars.forEach(star => {
       if (star.getAttribute('data-value') <= value) {
           star.classList.add('active');
       } else {
           star.classList.remove('active');
       }
   });
}
document.getElementById('love').addEventListener('click', react);
});
