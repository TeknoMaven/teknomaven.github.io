function formatPhoneNumberLive(input) {
    // Hapus semua karakter yang bukan angka
    let cleaned = input.replace(/[^\d]/g, '');

    // Ganti awalan 62 atau +62 dengan 08
    if (cleaned.startsWith('62')) {
        cleaned = '08' + cleaned.slice(2);
    } else if (cleaned.startsWith('8')) {
        cleaned = '08' + cleaned.slice(1);
    }

    // Pastikan panjang minimal nomor telepon adalah 10 karakter setelah diformat
    return cleaned;
}

// Tangkap elemen input
const phoneNumberInput = document.getElementById('phoneNumber');

// Tambahkan event listener untuk event input agar berfungsi secara live
phoneNumberInput.addEventListener('input', function() {
    let formattedPhoneNumber = formatPhoneNumberLive(phoneNumberInput.value);
    phoneNumberInput.value = formattedPhoneNumber;
});