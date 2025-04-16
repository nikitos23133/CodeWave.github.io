// Check if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("isAuthenticated") === "true") {
        document.getElementById("authModal").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
    }
});

function handleLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simulate authentication (replace with real backend logic in production)
    if (username && password) {
        localStorage.setItem("isAuthenticated", "true");
        document.getElementById("authModal").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
    } else {
        alert("Пожалуйста, введите имя пользователя и пароль.");
    }
}

function showRegister() {
    // For demo, treat registration as login (no separate logic)
    alert("Введите имя пользователя и пароль для регистрации.");
    document.getElementById("username").focus();
}

function showLogin() {
    // Already on login screen, just focus input
    document.getElementById("username").focus();
}

function logout() {
    localStorage.removeItem("isAuthenticated");
    document.getElementById("authModal").style.display = "flex";
    document.getElementById("mainContent").style.display = "none";
}