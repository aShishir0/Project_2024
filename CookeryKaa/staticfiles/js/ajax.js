function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

$(document).on('submit', '#reaction-form', function (e) {
    e.preventDefault();
    const post_id = $('#post_id').val();
    const reaction_type = $('#reaction_type').val();
    $.ajax({
        url: '/addReaction/',
        type: 'POST',
        headers: { "X-CSRFToken": csrftoken },
        data: {
            'post_id': post_id,
            'reaction_type': reaction_type
        },
        success: function (response) {
            // Update UI based on server response
            $('#reaction-count').text(response.reaction_count);
        }
    });
});

$(document).on('submit', '#comment-form', function (e) {
    e.preventDefault();
    const post_id = $('#post_id').val();
    const content = $('#comment_content').val();
    $.ajax({
        url: '/addComment/',
        type: 'POST',
        headers: { "X-CSRFToken": csrftoken },
        data: {
            'post_id': post_id,
            'content': content
        },
        success: function (response) {
            // Update UI based on server response
            $('#comments-count').text(response.comments_count);
            $('#comments-list').append(
                `<li>${response.username}: ${response.comment}</li>`
            );
        }
    });
});

$(document).on('submit', '#rating-form', function (e) {
    e.preventDefault();
    const post_id = $('#post_id').val();
    const rating = $('#rating').val();
    $.ajax({
        url: '/addRating/',
        type: 'POST',
        headers: { "X-CSRFToken": csrftoken },
        data: {
            'post_id': post_id,
            'rating': rating
        },
        success: function (response) {
            // Update UI based on server response
            $('#average-rating').text(response.average_rating);
        }
    });
});
