function togglePassword() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.textContent = "🙈"; // Change icon to hidden
    } else {
        passwordInput.type = "password";
        toggleIcon.textContent = "👁️"; // Change icon to show
    }
}