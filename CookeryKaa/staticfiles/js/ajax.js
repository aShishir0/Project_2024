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

$(document).on('click', '.like-button', function (e) {
    e.preventDefault();
    const this_ = $(this);
    const post_id = this_.attr('data-id');
    const action = this_.attr('data-action');
    $.ajax({
        url: `/like/${post_id}/`,
        type: 'POST',
        headers: { "X-CSRFToken": csrftoken },
        success: function (response) {
            if (action === 'like') {
                this_.attr('data-action', 'unlike');
                this_.text('Unlike');
            } else {
                this_.attr('data-action', 'like');
                this_.text('Like');
            }
        }
    });
});

$(document).on('submit', '#reaction-form', function (e) {
    e.preventDefault();
    const post_id = $('#post_id').val();
    const reaction_type = $('#reaction_type').val();
    $.ajax({
        url: '/addreaction/',
        type: 'POST',
        headers: { "X-CSRFToken": csrftoken },
        data: {
            'post_id': post_id,
            'reaction_type': reaction_type
        },
        success: function (response) {
            $('#reaction-count').text(response.reaction_count);
        }
    });
});

$(document).on('submit', '#comment-form', function (e) {
    e.preventDefault();
    const post_id = $('#post_id').val();
    const content = $('#comment_content').val();
    $.ajax({
        url: '/addcomment/',
        type: 'POST',
        headers: { "X-CSRFToken": csrftoken },
        data: {
            'post_id': post_id,
            'content': content
        },
        success: function (response) {
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
        url: '/addrating/',
        type: 'POST',
        headers: { "X-CSRFToken": csrftoken },
        data: {
            'post_id': post_id,
            'rating': rating
        },
        success: function (response) {
            $('#average-rating').text(response.average_rating);
        }
    });
});
