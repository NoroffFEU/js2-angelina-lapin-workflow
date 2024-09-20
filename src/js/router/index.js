export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      console.log("Rendering Home");
      await import("./views/home.js").then((module) => module.renderHome());
      break;
    case "/auth/login/":
      await import("./views/login.js").then((module) => module.renderLogin());
      break;
    case "/auth/register/":
      await import("./views/register.js").then((module) =>
        module.renderRegister()
      );
      break;
    case "/post/create/":
      await import("./views/postCreate.js").then((module) =>
        module.renderPostCreate()
      );
      break;
    case "/post/edit/":
      await import("./views/postEdit.js").then((module) =>
        module.renderPostEdit()
      );
      break;
    case "/profile/":
      await import("./views/profile.js").then((module) =>
        module.renderProfile()
      );
      break;
    default:
      await import("./views/notFound.js").then((module) =>
        module.renderNotFound()
      );
  }
}
