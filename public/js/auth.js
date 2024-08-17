const signUpHandler = async (evt) => {

    evt.preventDefault();

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

document.querySelector('#signup-user-form').addEventListener('submit', signUpHandler);