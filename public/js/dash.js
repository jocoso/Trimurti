
const addPostButtonHandler = () => {
    const addPostButton = document.querySelector("#add-post-button");

    if (addPostButton) {
        addPostButton.addEventListener('click', () => {
            // ADD POST CREATION LOGIC HERE
            console.log("A post was created!");
        });
    } else {
        console.log("Internal HTML Error.");
    }
}


// Handles starting the process of adding a new post
document.addEventListener('DOMContentLoaded', addPostButtonHandler);