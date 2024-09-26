import { authGuard } from "../../utilities/authGuard.js";
import { getPostById, updatePost } from "../../api/post/read.js";

authGuard();

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  const post = await getPostById(postId);
  document.getElementById("title").value = post.title;
  document.getElementById("body").value = post.body;
  document.getElementById("tags").value = post.tags.join(", ");
});

document
  .getElementById("editPostForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const updatedPost = {
      title: document.getElementById("title").value,
      body: document.getElementById("body").value,
      tags: document
        .getElementById("tags")
        .value.split(",")
        .map((tag) => tag.trim()),
    };

    await updatePost(postId, updatedPost);
    window.location.href = "/profile/index.html";
  });
