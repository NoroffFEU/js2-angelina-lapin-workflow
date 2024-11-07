import { authGuard } from "../../utilities/authGuard.js";
import { readProfile } from "../../api/profile/read.js";
import { loadUserPosts } from "../../api/post/read.js";
import router from "../../router/index.js";
import { deletePost } from "../../api/post/delete.js";

export async function renderProfile() {
  authGuard();

  const app = document.getElementById("app");
  if (!app) {
    console.error("Element with id 'app' not found.");
    return;
  }

  const username = localStorage.getItem("username");

  if (!username) {
    alert("Username not found. Redirecting to login.");
    window.location.href = "/auth/login/index.html";
    return;
  }

  try {
    const profileResponse = await readProfile(username);
    const profile = profileResponse.data;

    const avatarUrl =
      profile.avatar && profile.avatar.url
        ? profile.avatar.url
        : "https://via.placeholder.com/150";
    const avatarAlt =
      profile.avatar && profile.avatar.alt
        ? profile.avatar.alt
        : `${profile.name}'s Avatar`;

    app.innerHTML = `
        <div class="container my-5">
          <div class="card p-4 shadow-sm">
            <h1 class="text-center text-primary mb-4">${username}'s Profile</h1>
            <div class="text-center mb-4">
              <img src="${avatarUrl}" alt="${avatarAlt}" class="rounded-circle" width="150">
            </div>
            <p><strong>Bio:</strong> ${profile.bio || "No bio available"}</p>
            <div class="text-center my-3">
              <button id="createPostButton" class="btn btn-primary">Create Post</button>
            </div>
            <div id="postsContainer" class="mt-4">
              <h2 class="text-secondary">Posts</h2>
            </div>
          </div>
        </div>
      `;

    document
      .getElementById("createPostButton")
      .addEventListener("click", () => {
        window.location.href = "/post/create/";
      });

    const postsResponse = await loadUserPosts(username);
    const posts = postsResponse.data;

    const postsContainer = document.getElementById("postsContainer");

    if (posts.length === 0) {
      postsContainer.innerHTML += "<p>No posts available</p>";
    } else {
      postsContainer.innerHTML += posts
        .map(
          (post) => `
          <div class="card mb-3 shadow-sm" data-post-id="${post.id}">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.body}</p>
          <div class="d-flex justify-content-between mt-3">
            <button class="btn btn-outline-secondary edit-post" data-post-id="${post.id}">Edit Post</button>
            <button class="btn btn-danger delete-post" data-post-id="${post.id}">Delete Post</button>
            <button class="btn btn-link go-to-post" data-post-id="${post.id}">Go to Post</button>
          </div>
        </div>
      </div>
    `
        )
        .join("");

      document.querySelectorAll(".edit-post").forEach((button) => {
        button.addEventListener("click", (e) => {
          const postId = e.target.getAttribute("data-post-id");
          window.location.href = `/post/edit/index.html?id=${postId}`;
        });
      });

      document.querySelectorAll(".delete-post").forEach((button) => {
        button.addEventListener("click", async (e) => {
          const postId = e.target.getAttribute("data-post-id");
          if (confirm("Are you sure you want to delete this post?")) {
            try {
              await deletePost(postId);
              await renderProfile();
              alert("Post deleted successfully");
            } catch (error) {
              console.error("Error deleting post:", error);
              alert("Failed to delete post");
            }
          }
        });
      });

      document.querySelectorAll(".go-to-post").forEach((button) => {
        button.addEventListener("click", (e) => {
          const postId = e.target.getAttribute("data-post-id");
          if (postId) {
            window.history.pushState({}, "", `/post/view/?id=${postId}`);
            router();
          } else {
            console.error("Post ID not found");
          }
        });
      });
    }
  } catch (error) {
    console.error("Error rendering profile:", error);
    app.innerHTML = "<p>Failed to load profile data.</p>";
  }
}

document.addEventListener("DOMContentLoaded", renderProfile);
