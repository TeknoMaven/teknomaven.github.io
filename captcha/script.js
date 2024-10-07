$(document).ready(function () {
    const canvas = document.getElementById('captchaCanvas');
    const ctx = canvas.getContext('2d');

    function getRandomFont() {
        const fonts = ['Arial', 'Courier', 'Georgia', 'Times New Roman', 'Verdana'];
        return fonts[Math.floor(Math.random() * fonts.length)];
    }

    function generateCaptcha() {
        let captcha = '';
        for (let i = 0; i < 4; i++) {
            captcha += Math.floor(Math.random() * 10); // Generate random digit 0-9
        }

        drawCaptcha(captcha);
        return captcha;
    }

    function drawCaptcha(captcha) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set background
        ctx.fillStyle = '#f1f1f1';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw CAPTCHA text with random fonts and styles
        for (let i = 0; i < captcha.length; i++) {
            const x = 20 + i * 25;
            const y = 40;
            ctx.font = `bold 30px ${getRandomFont()}`;
            ctx.fillStyle = getRandomColor();
            ctx.fillText(captcha[i], x, y);
        }
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    let generatedCaptcha = generateCaptcha();

    // Reload CAPTCHA
    $('#reloadCaptcha').click(function () {
        generatedCaptcha = generateCaptcha();
        $('#captchaMessage').text('');
    });

    // Check CAPTCHA on submit
    $('#submitCaptcha').click(function () {
        const enteredCaptcha = $('#captchaInput').val();

        if (enteredCaptcha === generatedCaptcha) {
            $('#captchaMessage').text('CAPTCHA is correct').css('color', 'green');
        } else {
            $('#captchaMessage').text('CAPTCHA is incorrect, try again').css('color', 'red');
        }
    });

    // Prevent right-click and regenerate CAPTCHA on attempt to download
    $('#captchaCanvas').on('contextmenu', function (e) {
        e.preventDefault();  // Disable right-click context menu
        generatedCaptcha = generateCaptcha();  // Regenerate CAPTCHA
        alert('CAPTCHA regenerated due to attempted download!');
    });
});
