const postCommentHandler = async (e) => {
    e.preventDefault();

    const title = document.querySelector("#title-submit").value.trim(); // Ensure title is grabbed
    const content = document.querySelector("#comment-content").value.trim();

    var blog_url = document.location.href;
    const post_id = blog_url.substring(blog_url.lastIndexOf("/") + 1); // Use post_id instead of blog_id

    // Ensure both title and content are provided
    if (title && content) {
        try {
            const response = await fetch("/api/comment/", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    content,
                    post_id, // Pass post_id instead of blog_id
                }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                // Clear input fields
                document.querySelector("#title-submit").value = ""; // Corrected selector
                document.querySelector("#comment-content").value = "";

                // Reload page after a short delay to update the comment section
                setTimeout(() => {
                    document.location.reload();
                }, 100);
            } else {
                // Log error details for debugging
                const errorData = await response.json();
                console.log("Error posting comment:", errorData.message);
            }
        } catch (err) {
            console.error("Failed to post comment:", err);
        }
    } else {
        // Log when title or content is missing
        console.log("Both title and content must be provided.");
    }
};

// Adding event listener for comment submission
document.querySelector("#comment-submit").addEventListener("click", postCommentHandler);
