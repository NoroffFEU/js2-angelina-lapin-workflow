import { getPostById } from "../../api/post/read.js";

export async function renderPostView(postId) {
  const app = document.getElementById("app");
  if (!app) {
    console.error("Element with id 'app' not found.");
    return;
  }

  try {
    const post = await getPostById(postId);
    console.log("Post data:", post);

    app.innerHTML = `
      <h1>${post.title}</h1>
      <p>${post.body}</p>
      <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
      ${
        post.media && post.media.url
          ? `<img src="${post.media.url}" alt="${post.media.alt}" width="400">`
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
    `;
  } catch (error) {
    console.error("Failed to load post:", error);
    app.innerHTML = `<p>Failed to load post data.</p>`;
  }
}
