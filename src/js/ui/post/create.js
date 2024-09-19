import { createPost } from "../../api/post/create.js";

export async function onCreatePost(event) {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("body").value.trim();
  const tags = document.getElementById("tags").value.trim();
  const media = document.getElementById("media").value.trim();

  try {
    const data = await createPost({ title, body, tags, media });
    console.log("Post created successfully:", data);

    window.location.href = "/post/";
  } catch (error) {
    console.error("Error creating post:", error);
    alert(error.message);
  }
}
