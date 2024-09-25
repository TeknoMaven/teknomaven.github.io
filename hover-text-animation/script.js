$(document).ready(function() {
    // Membagi teks menjadi span per huruf, termasuk menangani spasi
    var text = $('#hoverText').text();
    var newText = '';
    for (var i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            newText += '<span class="space">&nbsp;</span>'; // Menangani spasi
        } else {
            newText += '<span>' + text[i] + '</span>';
        }
    }
    $('#hoverText').html(newText);

    // Menambahkan efek hover per huruf
    $('#hoverText span').hover(
        function() {
            $(this).animate({ fontSize: '3em' }, 300);
        },
        function() {
            $(this).animate({ fontSize: '2em' }, 300);
        }
    );
});
