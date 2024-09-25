import { authGuard } from "../../utilities/authGuard.js";
import { readProfile } from "../../api/profile/read.js";
import { loadUserPosts } from "../../api/post/read.js";

export async function renderProfile() {
  console.log("Starting profile rendering...");
  authGuard();

  const app = document.getElementById("app");
  if (!app) {
    console.error("Element with id 'app' not found.");
    return;
  }

  const username = localStorage.getItem("username");
  console.log("Username from localStorage:", username);

  if (!username) {
    alert("Username not found. Redirecting to login.");
    window.location.href = "/auth/login/index.html";
    return;
  }

  try {
    console.log("Fetching profile data for:", username);
    const profileResponse = await readProfile(username);
    const profile = profileResponse.data;
    console.log("Profile data fetched:", profile);

    const avatarUrl =
      profile.avatar && profile.avatar.url
        ? profile.avatar.url
        : "https://via.placeholder.com/150";
    const avatarAlt =
      profile.avatar && profile.avatar.alt
        ? profile.avatar.alt
        : `${profile.name}'s Avatar`;

    app.innerHTML = `
      <h1>${username}'s Profile</h1>
      <img src="${avatarUrl}" alt="${avatarAlt}" width="150">
      <div><strong>Bio:</strong> ${profile.bio || "No bio available"}</div>
      <button id="createPostButton">Create Post</button>
      <div id="postsContainer"><h2>Posts</h2></div>
    `;

    document
      .getElementById("createPostButton")
      .addEventListener("click", () => {
        window.location.href = "/post/create/";
      });

    console.log("Fetching posts for:", username);
    const postsResponse = await loadUserPosts(username);
    const posts = postsResponse.data;

    console.log("Posts loaded:", posts);

    const postsContainer = document.getElementById("postsContainer");

    if (posts.length === 0) {
      postsContainer.innerHTML += "<p>No posts available</p>";
    } else {
      postsContainer.innerHTML += posts
        .map(
          (post) => `
        <div class="post">
          <h2>${post.title}</h2>
          <p>${post.body}</p>
        </div>
      `
        )
        .join("");
    }
  } catch (error) {
    console.error("Error rendering profile:", error);
    app.innerHTML = "<p>Failed to load profile data.</p>";
  }
}
