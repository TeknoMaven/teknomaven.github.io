$(document).ready(function () {
    let currentIndex = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;

    $('.next').click(function () {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    });

    $('.prev').click(function () {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    function updateSlider() {
        const newMargin = -currentIndex * 100 + '%';
        $('.slides').css('transform', 'translateX(' + newMargin + ')');
    }

    // Responsiveness: Automatically adjust the image size to fit the screen
    $(window).on('resize', function() {
        updateSlider(); // Recalculate the slider position on window resize
    });
});
