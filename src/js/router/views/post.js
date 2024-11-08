import { getPostById } from "../../api/post/read.js";

export async function renderPostView(postId) {
  const app = document.getElementById("app");
  if (!app) {
    console.error("Element with id 'app' not found.");
    return;
  }

  try {
    const post = await getPostById(postId);

    app.innerHTML = `
  <div class="container my-5">
    <div class="card p-4 shadow-sm">
      <h1 class="card-title text-primary text-center">${post.title}</h1>
      <div class="card-body">
        <p class="card-text">${post.body}</p>
        <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
        ${
          post.media && post.media.url
            ? `<div class="text-center my-3"><img src="${post.media.url}" alt="${post.media.alt}" class="img-fluid" width="400"></div>`
            : ""
        }
        <p><strong>Created at:</strong> ${new Date(
          post.created
        ).toLocaleDateString()}</p>
        <p><strong>Updated at:</strong> ${new Date(
          post.updated
        ).toLocaleDateString()}</p>
        <p><strong>Comments:</strong> ${post._count.comments}</p>
        <p><strong>Reactions:</strong> ${post._count.reactions}</p>
        <div class="d-flex justify-content-between mt-4">
          <button id="backButton" class="btn btn-secondary">Go Back</button>
          <button id="homeButton" class="btn btn-link">Go Back to Home</button>
        </div>
      </div>
    </div>
  </div>
`;

    document.getElementById("backButton").addEventListener("click", () => {
      window.location.href = "/profile/";
    });

    document.getElementById("homeButton").addEventListener("click", () => {
      window.location.href = "/";
    });
  } catch (error) {
    console.error("Failed to load post:", error);
    app.innerHTML = `<p>Failed to load post data.</p>`;
  }
}
