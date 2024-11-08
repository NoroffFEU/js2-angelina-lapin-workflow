import { authGuard } from "../../utilities/authGuard.js";
import { getPostById } from "../../api/post/read.js";
import { updatePost } from "../../api/post/update.js";

export async function renderPostEdit(postId) {
  authGuard();

  const app = document.getElementById("app");
  if (!app) {
    console.error("Element with id 'app' not found.");
    return;
  }

  const post = await getPostById(postId);

  app.innerHTML = `
  <div class="container my-5">
    <div class="card p-4 shadow border-0">
      <h1 class="display-6 text-muted mb-4 text-center">Edit Post</h1>
      <form id="editPostForm">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input id="title" type="text" name="title" class="form-control" value="${
            post.title
          }" required />
        </div>

        <div class="mb-3">
          <label for="body" class="form-label">Body</label>
          <textarea id="body" name="body" class="form-control" rows="5" required>${
            post.body
          }</textarea>
        </div>

        <div class="mb-3">
          <label for="tags" class="form-label">Tags (comma separated)</label>
          <input id="tags" type="text" name="tags" class="form-control" value="${post.tags.join(
            ", "
          )}" />
        </div>

        <div class="d-flex justify-content-between mt-4">
          <button type="submit" class="btn btn-outline-primary">Update Post</button>
          <div>
            <button type="button" id="goBackButton" class="btn btn-secondary me-2">Go Back</button>
            <button type="button" id="goBackHomeButton" class="btn btn-link">Go Back to Homepage</button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

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

      try {
        await updatePost(postId, updatedPost);
        window.location.href = "/profile/";
      } catch (error) {
        console.error("Error updating post:", error);
        alert("Failed to update post");
      }
    });

  document.getElementById("goBackButton").addEventListener("click", () => {
    window.history.back();
  });

  document.getElementById("goBackHomeButton").addEventListener("click", () => {
    window.location.href = "/";
  });
}
