function togglePassword() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("togglePassword");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("far", "fa-eye");
        toggleIcon.classList.add("far", "fa-eye-slash");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("far", "fa-eye-slash");
        toggleIcon.classList.add("far", "fa-eye");
    }
}
