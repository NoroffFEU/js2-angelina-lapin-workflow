import { API_AUTH_LOGIN } from "../constants.js";

export async function login({ email, password }) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Login API error:", error);
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();
    console.log("Login API response:", data);

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
