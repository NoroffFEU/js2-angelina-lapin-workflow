import { createPost } from "../../api/post/create.js";

export async function onCreatePost(event) {
  event.preventDefault();

  const title = document.getElementById("postTitle").value;
  const body = document.getElementById("postBody").value;

  try {
    await createPost({ title, body });
    window.location.href = "/profile/index.html";
  } catch (error) {
    console.error("Error creating post:", error);
    alert("Failed to create post");
  }
}
