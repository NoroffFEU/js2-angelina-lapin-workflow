import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

export async function readPost(id) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "GET",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch post");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

export async function readPosts(limit = 12, page = 1, tag) {
  try {
    let url = `${API_SOCIAL_POSTS}?limit=${limit}&page=${page}`;
    if (tag) {
      url += `&tag=${encodeURIComponent(tag)}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch posts");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  try {
    let url = `${API_SOCIAL_POSTS}?username=${encodeURIComponent(
      username
    )}&limit=${limit}&page=${page}`;
    if (tag) {
      url += `&tag=${encodeURIComponent(tag)}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch posts by user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts by user:", error);
    throw error;
  }
}
