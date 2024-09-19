import { login } from "../../api/auth/login.js";

export async function onLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const data = await login({ email, password });

    console.log("Login successful:", data);

    localStorage.setItem("token", data.token);

    window.location.href = "/";
  } catch (error) {
    alert(error.message);
  }
}
