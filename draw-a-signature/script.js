$(document).ready(function () {
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    // Set canvas size based on its CSS width and height
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set initial pen style
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';

    // Event listeners for drawing on the canvas
    $(canvas).on('mousedown', function (e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    $(canvas).on('mousemove', function (e) {
        if (isDrawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    });

    $(canvas).on('mouseup mouseleave', function () {
        isDrawing = false;
        ctx.closePath();
    });

    // Clear canvas
    $('#clear').click(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Download signature as image
    $('#download').click(function () {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
    });
});
