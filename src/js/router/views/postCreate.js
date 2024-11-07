import { onCreatePost } from "../../ui/post/create.js";
import { authGuard } from "../../utilities/authGuard.js";

export function renderPostCreate() {
  authGuard();

  const app = document.getElementById("app");
  if (!app) {
    console.error("Element with id 'app' not found.");
    return;
  }

  app.innerHTML = `
  <div class="container my-5">
    <div class="card p-4 shadow border-0">
      <h1 class="display-6 text-muted mb-4 text-center">Create Post</h1>
      <form name="createPost">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input id="title" type="text" name="title" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="body" class="form-label">Body</label>
          <textarea id="body" name="body" class="form-control" rows="5" required></textarea>
        </div>

        <div class="mb-3">
          <label for="tags" class="form-label">Tags (comma separated)</label>
          <input id="tags" type="text" name="tags" class="form-control" placeholder="tag1, tag2" />
        </div>

        <div class="mb-3">
          <label for="mediaUrl" class="form-label">Media URL</label>
          <input id="mediaUrl" type="url" name="mediaUrl" class="form-control" placeholder="https://example.com/image.jpg" />
        </div>

        <div class="mb-3">
          <label for="mediaAlt" class="form-label">Media Alt Text</label>
          <input id="mediaAlt" type="text" name="mediaAlt" class="form-control" placeholder="Description of the image" />
        </div>

        <button type="submit" class="btn btn-outline-primary w-100">Create Post</button>
      </form>
    </div>
  </div>
`;

  const form = document.forms["createPost"];
  if (form) {
    form.addEventListener("submit", onCreatePost);
  } else {
    console.error("Create post form not found.");
  }
}
