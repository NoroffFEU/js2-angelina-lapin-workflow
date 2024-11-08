import { renderForm } from "./formRenderer.js";
import { onLogin } from "../../ui/auth/login.js";

export function renderLogin() {
  renderForm({
    title: "Login",
    fields: [
      {
        id: "email",
        label: "Email",
        type: "email",
        name: "email",
        required: true,
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        name: "password",
        required: true,
      },
    ],
    submitText: "Login",
    onSubmit: onLogin,
    linkText: "Register",
    linkHref: "/auth/register/",
  });
}
