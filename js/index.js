// Change to true if the user is logged in, false if not
const userIsLoggedIn = false; 

// Taking the exact IDs from the navigation bar
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const logoutLink = document.getElementById('logout-link');

// When a user is logged in, hide the login and register links, and show the logout link
if (userIsLoggedIn) {
    loginLink.classList.add('hidden');
    registerLink.classList.add('hidden');
    logoutLink.classList.remove('hidden');
}