import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

export async function createPost({ title, body, tags, media }) {
  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      method: "POST",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        body,
        tags: tags.split(",").map((tag) => tag.trim()),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create post");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
