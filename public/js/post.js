const postCommentHandler = async (e) => {
    e.preventDefault();
    const content = document.querySelector("#comment-content").value.trim();

    var blog_url = document.location.href;
    const blog_id = blog_url.substring(blog_url.lastIndexOf("/") + 1);

    if (content) {
        const response = await fetch("/api/comment/", {
            method: "POST",
            body: JSON.stringify({
                title: "dummy title",
                content,
                blog_id,
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.querySelector("#comment-content").value = "";
            setTimeout(() => {
                document.location.reload();
            }, 100);
        } else {
            console.log("The post call returned an error. ", response);
        }
    } else {
        console.log("No comment error");
    }

    
};

document
    .querySelector("#comment-submit")
    .addEventListener("click", postCommentHandler);
