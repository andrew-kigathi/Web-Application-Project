// ==========================================
// GENERAL.JS - Global Navigation & Setup
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // Select the navigation elements
    const userGreeting = document.getElementById("user-greeting");
    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const logoutLink = document.getElementById("logout-link");

    // Check your browser's local memory to see if a user is logged in
    const currentUser = localStorage.getItem("ak_sounds_user");

    // If a user is found, update the navigation bar
    if (currentUser) {
        if (userGreeting) {
            userGreeting.textContent = `Welcome, ${currentUser}!`;
            userGreeting.classList.remove("hidden"); // Show greeting
        }
        if (loginLink) loginLink.classList.add("hidden");       // Hide Login
        if (registerLink) registerLink.classList.add("hidden"); // Hide Register
        if (logoutLink) logoutLink.classList.remove("hidden");  // Show Logout
    }
});