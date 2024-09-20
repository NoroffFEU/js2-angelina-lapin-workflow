import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

export async function readProfile(username) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
      method: "GET",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}
