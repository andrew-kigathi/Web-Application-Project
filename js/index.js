document.addEventListener("DOMContentLoaded", () => {

    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
    const userGreeting = document.getElementById('user-greeting'); 

    // Check if a user is currently logged in
    const currentUser = localStorage.getItem('ak_sounds_current_user');

    if (currentUser) {
        // If logged in: Hide Login/Register, Show Logout & Greeting
        if (loginLink) loginLink.classList.add('hidden');
        if (registerLink) registerLink.classList.add('hidden');
        if (logoutLink) logoutLink.classList.remove('hidden');
        
        if (userGreeting) {
            userGreeting.textContent = `Welcome back ${currentUser}`;
            userGreeting.classList.remove('hidden');
        }
    }

    // Handle the Logout Button
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            // 1. Prevent the link from navigating immediately
            e.preventDefault();

            // 2. Show the confirmation box
            const confirmed = window.confirm("Are you sure you want to log out?");

            // 3. If the user clicks "OK", proceed with logout
            if (confirmed) {
                localStorage.removeItem('ak_sounds_current_user');
                // 4. Manually redirect to the logout/home page
                window.location.href = 'logout.html'; 
            }
            // If they click "Cancel", the code stops here and nothing happens
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => { 
            e.preventDefault(); 

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Retrieve the saved info
            const storedEmail = localStorage.getItem('ak_sounds_user_email');
            const storedPassword = localStorage.getItem('ak_sounds_user_password');
            const storedUsername = localStorage.getItem('ak_sounds_user_name');

            // Check if what they typed matches what we have saved
            if (email === storedEmail && password === storedPassword) {
                // Log them in and send to homepage
                localStorage.setItem('ak_sounds_current_user', storedUsername);
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    }
});