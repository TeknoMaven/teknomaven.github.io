$(document).ready(function() {
    var qrcode;

    $('#generate').on('click', function() {
        var text = $('#qrText').val();
        var qrSize = $('#qrSize').val(); // Ambil ukuran QR Code
        var logoWidth = $('#logoWidth').val();
        var logoHeight = $('#logoHeight').val();
        
        // Clear previous QR code
        $('#qrcode').empty();

        // Generate new QR code
        qrcode = new QRCode(document.getElementById("qrcode"), {
            text: text,
            width: qrSize, // Set lebar QR code sesuai input
            height: qrSize // Set tinggi QR code sesuai input (1:1 ratio)
        });

        // Upload logo and place it in the center of the QR code
        var logoInput = document.getElementById('logoInput');
        if (logoInput.files && logoInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var img = $('<img>')
                    .attr('src', e.target.result)
                    .addClass('logo')
                    .css({
                        'width': logoWidth + 'px',
                        'height': logoHeight + 'px'
                    });
                $('#qrcode').append(img);
            }
            reader.readAsDataURL(logoInput.files[0]);
        }
    });

    // Download QR code with logo
    $('#download').on('click', function() {
        var canvas = document.createElement('canvas');
        var qrCodeCanvas = $('#qrcode canvas')[0];
        var logoImg = $('#qrcode img.logo')[0];

        // Set canvas size
        canvas.width = qrCodeCanvas.width;
        canvas.height = qrCodeCanvas.height;
        var ctx = canvas.getContext('2d');

        // Draw QR code on canvas
        ctx.drawImage(qrCodeCanvas, 0, 0);

        // Draw logo on canvas if exists
        if (logoImg) {
            var logoWidth = parseInt($('#logoWidth').val());
            var logoHeight = parseInt($('#logoHeight').val());
            var x = (canvas.width / 2) - (logoWidth / 2);
            var y = (canvas.height / 2) - (logoHeight / 2);
            ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
        }

        // Create a download link
        var link = document.createElement('a');
        link.href = canvas.toDataURL("image/png");
        link.download = 'qrcode_with_logo.png';
        link.click();
    });
});
