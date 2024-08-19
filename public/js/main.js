
// POST REQUEST API/USERS/LOGOUT
const logoutHandler = (evt) => {

    // Is the button present with us?
    const logoutButton = document.querySelector('#logout-button');

    if (logoutButton) {

        logoutButton.addEventListener('click', async () => {

            const response = await fetch('/api/user/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {

                document.location.replace('/');

            } else {

                console.error('Logout failed:', response.statusText);
                document.location.replace('/');

            }
        });
    }
}

// REDIRECT /AUTH
const loginButtonHandler = (evt) => {

    // Is the button present with us?
    const loginButton = document.querySelector('#login-button');

    if (loginButton) {

        loginButton.addEventListener('click', () => {

            document.location.replace('/auth');

        });
        
    }

}

// Log out button has been clicked
document.addEventListener('DOMContentLoaded', () => {
    logoutHandler();
    loginButtonHandler();
});