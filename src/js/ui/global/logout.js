import { onLogout } from "../auth/logout.js";

export function setLogoutListener() {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", onLogout);
    console.log("Logout listener set.");
  } else {
    console.warn("Logout button not found on the page.");
  }
}
