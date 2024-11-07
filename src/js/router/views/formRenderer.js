export function renderForm({
  title,
  fields,
  submitText,
  onSubmit,
  linkText,
  linkHref,
}) {
  const app = document.getElementById("app");

  const fieldHtml = fields
    .map(
      ({
        id,
        label,
        type,
        name,
        pattern,
        title,
        required,
        maxlength,
        minlength,
      }) => `
      <div class="form-group mb-3">
        <label for="${id}" class="form-label">${label}</label>
        <input 
          id="${id}" 
          type="${type}" 
          name="${name}" 
          class="form-control" 
          ${required ? "required" : ""}
          ${pattern ? `pattern="${pattern}"` : ""}
          ${title ? `title="${title}"` : ""}
          ${maxlength ? `maxlength="${maxlength}"` : ""}
          ${minlength ? `minlength="${minlength}"` : ""}
        />
      </div>
    `
    )
    .join("");

  app.innerHTML = `
    <div class="form-container">
      <h1 class="text-center">${title}</h1>
      <form>
        ${fieldHtml}
        <div class="d-flex justify-content-between">
        <a href="${linkHref}" class="btn btn-link">${linkText}</a>
        <button type="submit" class="btn btn-primary">${submitText}</button>
        </div>
      </form>
    </div>
  `;

  const form = app.querySelector("form");
  form.addEventListener("submit", onSubmit);
}
