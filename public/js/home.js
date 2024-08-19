
const callPostPage = () => {

    const postTemplates = document.querySelectorAll('.post-template');

    postTemplates.forEach(template => {
        template.addEventListener('click', () => {
            const postId = template.getAttribute('data-id');
            window.location.href = `/post/${postId}`;
        })
    })
}


document.addEventListener('DOMContentLoaded', callPostPage);