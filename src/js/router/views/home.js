export function renderHome() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
    <a href="/auth/login/">Login</a>
    <a href="/auth/register/">Register</a>
  `;
}
