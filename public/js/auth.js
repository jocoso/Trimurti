
// POST REQUEST TO API/USER
const signUpHandler = async (event) => {

    event.preventDefault();

    // Extracting user input...
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) { // Validating both name and passwords exists

        // Retrieving data from the API...
        const response = await fetch('/api/user/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) { // Data was received...
            document.location.replace('/'); // We send the user to homepage
            console.log("- It has been Accepted -");
        } else {
            console.log("- Forbidden SignIn -", response);
        }

    } else {
        console.log("Name or Password field are empty");
    }
}

// POST REQUEST TO API/USER/LOGIN
const loginHandler = async (event) => {

    event.preventDefault();

    // Extracting user input...
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) { // Validating both name and passwords exists

        // Retrieving data from the API...
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) { // Data was received...

            setTimeout(() => {document.location.replace('/')}, 100); // We send the user to homepage
            return;

        } else {
            console.log("- Forbidden Login -");
        }

    } else {
        console.log("Name or Password field are empty");
    }
}

// Connecting form submission with function
document.querySelector('#signup-user-form').addEventListener('submit', (e) => signUpHandler(e));
document.querySelector('#login-user-form').addEventListener('submit', (e) => loginHandler(e));