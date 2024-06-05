function getCSRFToken() {
    return document.querySelector('input[name="csrfmiddlewaretoken"]').value;
}

function addReaction(postId, reactionType) {
    $.ajax({
        url: "/add_reaction/",
        type: "POST",
        data: {
            'post_id': postId,
            'reaction_type': reactionType,
            'csrfmiddlewaretoken': getCSRFToken()
        },
        success: function(response) {
            console.log("Reaction success:", response);
            document.getElementById('reaction_count').innerText = response.reaction_count;
        },
        error: function(xhr, status, error) {
            console.error("Reaction error:", status, error);
        }
    });
}

function addComment(postId, content) {
    $.ajax({
        url: "/add_comment/",
        type: "POST",
        data: {
            'post_id': postId,
            'content': content,
            'csrfmiddlewaretoken': getCSRFToken()
        },
        success: function(response) {
            console.log("Comment success:", response);
            document.getElementById('comment_count').innerText = response.comments_count;
            var commentsList = document.getElementById('comments_list');
            commentsList.innerHTML += '<p><strong>' + response.username + ':</strong> ' + response.comment + '</p>';
            document.getElementById('comment_content').value = '';
        },
        error: function(xhr, status, error) {
            console.error("Comment error:", status, error);
        }
    });
}

function addRating(postId, ratingValue) {
    $.ajax({
        url: "/add_rating/",
        type: "POST",
        data: {
            'post_id': postId,
            'rating': ratingValue,
            'csrfmiddlewaretoken': getCSRFToken()
        },
        success: function(response) {
            console.log("Rating success:", response);
            document.getElementById('average_rating').innerText = response.average_rating.toFixed(1);
        },
        error: function(xhr, status, error) {
            console.error("Rating error:", status, error);
        }
    });
}
