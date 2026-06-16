document.addEventListener("DOMContentLoaded", () => {

    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
    const userGreeting = document.getElementById('user-greeting'); // The new username text

    // Check if a user is currently logged in by looking in the browser's storage
    const currentUser = localStorage.getItem('ak_sounds_current_user');

    if (currentUser) {
        // If logged in: Hide Login/Register, Show Logout & Greeting
        if (loginLink) loginLink.classList.add('hidden');
        if (registerLink) registerLink.classList.add('hidden');
        if (logoutLink) logoutLink.classList.remove('hidden');
        
        if (userGreeting) {
            userGreeting.textContent = `Hi, ${currentUser}`;
            userGreeting.classList.remove('hidden');
        }
    }

    // Handles the logout process when the user clicks the logout link
    if (logoutLink) {
        logoutLink.addEventListener('click', () => {
            // Remove the user from the "logged in" state
            localStorage.removeItem('ak_sounds_current_user');
            // The HTML link will automatically take them to logout.html
        });
    }

    // Handles the registration form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stops the page from refreshing
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Save credentials to local storage
            localStorage.setItem('ak_sounds_user_email', email);
            localStorage.setItem('ak_sounds_user_password', password);
            localStorage.setItem('ak_sounds_user_name', username);

            // Automatically log them in after registering
            localStorage.setItem('ak_sounds_current_user', username);

            // Send them back to the homepage
            window.location.href = 'index.html';
        });
    }

    // Handles the login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stops the page from refreshing

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Retrieve the saved "database" info
            const storedEmail = localStorage.getItem('ak_sounds_user_email');
            const storedPassword = localStorage.getItem('ak_sounds_user_password');
            const storedUsername = localStorage.getItem('ak_sounds_user_name');

            // Check if what they typed matches what we have saved
            if (email === storedEmail && password === storedPassword) {
                // Success! Log them in.
                localStorage.setItem('ak_sounds_current_user', storedUsername);
                window.location.href = 'index.html';
            } else {
                // Failure.
                alert('Invalid email or password. Please try again.');
            }
        });
    }
});