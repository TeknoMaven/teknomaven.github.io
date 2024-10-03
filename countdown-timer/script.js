let countdown;
let isPaused = true;
let remainingTime = 0;

function updateDisplay(minutes, seconds) {
    let min = minutes < 10 ? '0' + minutes : minutes;
    let sec = seconds < 10 ? '0' + seconds : seconds;
    $('#timer').text(`${min}:${sec}`);
}

function startTimer(duration) {
    let timer = duration;
    countdown = setInterval(function () {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        updateDisplay(minutes, seconds);

        if (timer <= 0) {
            clearInterval(countdown);
            notifyEnd();
        } else {
            timer--;
        }
        remainingTime = timer;
    }, 1000);
}

function notifyEnd() {
    // Notifikasi suara
    $('#alarm-sound')[0].play();

    // Notifikasi browser
    if (Notification.permission === "granted") {
        new Notification("Time's Up!", {
            body: "The countdown has finished.",
            icon: "https://www.iconpacks.net/icons/2/free-alarm-clock-icon-3099-thumb.png"
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Time's Up!", {
                    body: "The countdown has finished.",
                    icon: "https://www.iconpacks.net/icons/2/free-alarm-clock-icon-3099-thumb.png"
                });
            }
        });
    }
}

$('#start-pause-btn').click(function () {
    let inputMinutes = parseInt($('#minutes-input').val()) || 0;
    let inputSeconds = parseInt($('#seconds-input').val()) || 0;

    if (isPaused) {
        $(this).text('Pause');
        isPaused = false;
        let totalTime = inputMinutes * 60 + inputSeconds;
        if (remainingTime === 0) {
            startTimer(totalTime);
        } else {
            startTimer(remainingTime);
        }
    } else {
        $(this).text('Start');
        isPaused = true;
        clearInterval(countdown);
    }
});

$('#reset-btn').click(function () {
    clearInterval(countdown);
    isPaused = true;
    remainingTime = 0;
    $('#start-pause-btn').text('Start');
    updateDisplay(0, 0);
    $('#minutes-input').val('');
    $('#seconds-input').val('');
});

// Minta izin notifikasi browser saat halaman dimuat
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}
