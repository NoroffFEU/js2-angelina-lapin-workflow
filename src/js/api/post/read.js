import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

export async function loadUserPosts(username) {
  const postsContainer = document.getElementById("postsContainer");

  try {
    const response = await fetch(
      `${API_SOCIAL_PROFILES}/${username}/posts?limit=12`,
      {
        headers: {
          ...headers(),
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to load posts");
    }

    const posts = await response.json();
    postsContainer.innerHTML = posts
      .map(
        (post) => `
          <div class="post">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <button class="editPost" data-id="${post.id}">Edit</button>
            <button class="deletePost" data-id="${post.id}">Delete</button>
          </div>`
      )
      .join("");

    document.querySelectorAll(".editPost").forEach((button) => {
      button.addEventListener("click", (event) => {
        const postId = event.target.getAttribute("data-id");
        window.location.href = `/post/edit/index.html?postId=${postId}`;
      });
    });

    document.querySelectorAll(".deletePost").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const postId = event.target.getAttribute("data-id");
        await deletePost(postId);
        window.location.reload();
      });
    });
  } catch (error) {
    console.error("Error loading posts:", error);
    postsContainer.innerHTML = "<p>Failed to load posts.</p>";
  }
}

export async function readPosts(limit = 12, page = 1) {
  try {
    const response = await fetch(
      `${API_SOCIAL_POSTS}?limit=${limit}&page=${page}`,
      {
        headers: {
          ...headers(),
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to load posts");
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
