$(document).ready(function() {
  // Fungsi untuk berpindah antar input
  $(".otp-input").on("keyup", function(e) {
    var input = $(this);
    var value = input.val();
    var nextInput = input.next(".otp-input");
    var prevInput = input.prev(".otp-input");

    // Pastikan hanya angka yang dapat dimasukkan
    if (!/^\d$/.test(value)) {
      input.val('');
      return;
    }

    if (value.length === 1 && nextInput.length) {
      nextInput.focus();
    }

    // Arrow key navigation
    if (e.key === "ArrowRight" && nextInput.length) {
      nextInput.focus();
    } else if (e.key === "ArrowLeft" && prevInput.length) {
      prevInput.focus();
    }

    // Pindah ke input sebelumnya jika Backspace ditekan
    if (e.key === "Backspace" && prevInput.length) {
      prevInput.focus();
    }
  });

  // Handle OTP submission
  $('#submit-otp').click(function(e) {
    e.preventDefault();
    let otp = '';
    $('.otp-input').each(function() {
      otp += $(this).val();
    });
    alert('OTP entered: ' + otp);
  });
});