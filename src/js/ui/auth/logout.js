export function onLogout() {
  localStorage.removeItem("token");

  console.log("Logged out successfully.");

  window.location.href = "/auth/login/";
}
