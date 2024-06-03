
function addReaction(postId, reactionType) {
   $.ajax({
       url: "/add_reaction/",
       type: "POST",
       data: {
           'post_id': postId,
           'reaction_type': reactionType,
           'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
       },
       success: function(response) {
           document.getElementById('reaction_count').innerText = response.reaction_count;
       }
   });
}

function addComment(postId) {
   var content = document.getElementById('comment_content').value;
   $.ajax({
       url: "/add_comment/",
       type: "POST",
       data: {
           'post_id': postId,
           'content': content,
           'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
       },
       success: function(response) {
           document.getElementById('comments_count').innerText = response.comments_count;
           var commentsList = document.getElementById('comments_list');
           commentsList.innerHTML += '<p><strong>' + response.username + ':</strong> ' + response.comment + '</p>';
           document.getElementById('comment_content').value = '';  // Clear the input field
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
           'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
       },
       success: function(response) {
           document.getElementById('average_rating').innerText = response.average_rating.toFixed(1);
       }
   });
}
