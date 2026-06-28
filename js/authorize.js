document.addEventListener("DOMContentLoaded", () => {
    // 1. Get Nav Elements
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
    const userGreeting = document.getElementById('user-greeting');
    
    // 2. Get Form Elements
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // 3. Check State
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPath = window.location.pathname;

    // 4. Update the Navigation Bar
    if (isLoggedIn) {
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        
        if (logoutLink) {
            logoutLink.style.display = 'inline-block';
            logoutLink.classList.remove('hidden'); 
        }
        
        if (userGreeting) {
            const savedName = localStorage.getItem('username') || 'Producer';
            userGreeting.textContent = `Welcome, ${savedName}`;
            userGreeting.style.display = 'inline-block';
            userGreeting.classList.remove('hidden');
        }

        if (currentPath.includes('login.html') || currentPath.includes('register.html')) {
            window.location.href = 'index.html';
        }
    } else {
        if (loginLink) {
            loginLink.style.display = 'inline-block';
            loginLink.classList.remove('hidden');
        }
        if (registerLink) {
            registerLink.style.display = 'inline-block';
            registerLink.classList.remove('hidden');
        }
        
        if (logoutLink) logoutLink.style.display = 'none';
        if (userGreeting) userGreeting.style.display = 'none';
    }

    // 5. REGISTRATION (Saves user to database)
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value.toLowerCase();
            const password = document.getElementById('password').value;

            // Retrieve existing users array, or create a new empty one
            let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

            // Check if the email is already in the array
            const emailExists = users.find(u => u.email === email);
            if (emailExists) {
                alert("This email is already registered. Please log in.");
                return; // Stop the script here
            }

            // Save the new user details
            users.push({ username, email, password });
            localStorage.setItem('registeredUsers', JSON.stringify(users));
            
            // Log them in automatically
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            
            alert("Account created successfully!");
            window.location.href = 'index.html';
        });
    }

    // 6. LOGIN (Validates against database)
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value.toLowerCase();
            const password = document.getElementById('password').value;
            
            // Retrieve existing users array
            let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

            // Look for a match against the username string
            const validUser = users.find(u => u.username.toLowerCase() === username && u.password === password);

            if (validUser) {
                // Match found: Log them in
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', validUser.username);
                window.location.href = 'index.html';
            } else {
                alert("Invalid username or password. Have you registered yet?");
            }
        });
    }

    // 7. Handle Logout Page Actions
    if (currentPath.includes('logout.html')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
});