$(document).ready(function() {
    $('#match-list').on('click', 'li', function() {
        var click_text = $(this).text().split('|');
        $('#search').val($.trim(click_text[0])).focus();
        $("#match-list").addClass('toggleHidden');
    });

    $(":submit").on('click', function() {
        $('#match-list').addClass('toggleHidden');
    });
    
    $(document).on("keypress", 'form', function (e) {
        var code = e.keyCode;
        if (code == 13) {
            $('#match-list').addClass('toggleHidden');
        } else {
            $('#match-list').removeClass('toggleHidden');
        }
    });    
} )