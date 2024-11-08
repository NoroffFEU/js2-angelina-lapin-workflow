import { renderForm } from "./formRenderer.js";
import { onRegister } from "../../ui/auth/register.js";

export function renderRegister() {
  renderForm({
    title: "Register",
    fields: [
      {
        id: "name",
        label: "Name",
        type: "text",
        name: "name",
        required: true,
        maxlength: 20,
        pattern: "^[\\w]+$",
        title: "Please enter a username using only letters and numbers",
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        name: "email",
        required: true,
        pattern: "^[\\w\\-.]+@(stud\\.)?noroff\\.no$",
        title: "Please enter a valid noroff.no or stud.noroff.no address",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        name: "password",
        required: true,
        minlength: 8,
      },
    ],
    submitText: "Register",
    onSubmit: onRegister,
    linkText: "Login",
    linkHref: "/auth/login/",
  });
}
