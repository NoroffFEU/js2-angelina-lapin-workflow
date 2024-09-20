import { authGuard } from "../../utilities/authGuard.js";
import { readProfile } from "../../api/profile/read.js";
import { loadUserPosts } from "../../api/post/read.js";

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
    const profile = await readProfile(username);

    app.innerHTML = `
      <h1>${profile.name}'s Profile</h1>
      <img src="${profile.avatar}" alt="${profile.name}'s Avatar" width="150">
      <div><strong>Bio:</strong> ${profile.bio}</div>
      <button id="createPostButton">Create Post</button>
      <div id="postsContainer"></div>
    `;

    document
      .getElementById("createPostButton")
      .addEventListener("click", () => {
        window.location.href = "/post/create/index.html";
      });

    loadUserPosts(username);
  } catch (error) {
    console.error("Error rendering profile:", error);
    app.innerHTML = "<p>Failed to load profile data.</p>";
  }
}
