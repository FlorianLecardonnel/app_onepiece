// api/comments.ts

// Function to fetch comments
export async function fetchComments(articleId: number) {
    try {
        const response = await fetch(`/api/articles/${articleId}/comments`);
        if (!response.ok) {
            throw new Error(`Failed to fetch comments: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
}

// Function to post a comment
export async function postComment(
    articleId: number,
    content: string,
    authorUsername: string
) {
    try {
        const response = await fetch(`/api/articles/${articleId}/comments/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: content,
                authorUsername: authorUsername,
            }),
        });
        if (!response.ok) {
            throw new Error(`Failed to post comment: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error posting comment:", error);
        throw error;
    }
}
