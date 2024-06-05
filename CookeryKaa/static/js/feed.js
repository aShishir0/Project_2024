
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
        
        // Calling the AJAX function to update reaction on server
        const postId = loveButton.closest('.post').dataset.postId;
        console.log("Sending reaction:", postId, 'love');
        addReaction(postId, 'love');
        
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
        
        // Calling the AJAX function to update rating on server
        const postId = event.target.closest('.post').dataset.postId;
        console.log("Sending rating:", postId, currentRating);
        addRating(postId, currentRating);
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

    document.querySelectorAll('.sharedown').forEach(shareButton => {
        shareButton.addEventListener('click', function() {
            const shareMenu = this.querySelector('ul');
            if (shareMenu.style.display === 'block') {
                shareMenu.style.display = 'none';
            } else {
                shareMenu.style.display = 'block';
            }
        });
    });

    window.toggleCommentSection = function(button) {
        const post = button.closest('.post');
        const commentSection = post.querySelector('.comment-section');
        if (commentSection.style.display === 'none' || !commentSection.style.display) {
            commentSection.style.display = 'block';
        } else {
            commentSection.style.display = 'none';
        }
    }

    window.handleCommentSubmit = function(button) {
        const commentSection = button.closest('.comment-section');
        const commentInput = commentSection.querySelector('.comment-input-field');
        const commentsList = commentSection.querySelector('.comments-list');
        const comment = commentInput.value.trim();
        const postId = button.closest('.post').dataset.postId;

        if (comment !== "") {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <img src="{% static 'img/profile/profile4.jpg' %}" alt="user profile">
                <span class="comment-text">${comment}</span>
            `;
            commentsList.appendChild(commentElement);
            commentInput.value = '';

            // Calling the AJAX function to add comment on server
            console.log("Sending comment:", postId, comment);
            addComment(postId, comment);
            
        }
    }
});
