import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

export async function deletePost(id) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "DELETE",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete post");
    }

    console.log("Post deleted successfully.");
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}
