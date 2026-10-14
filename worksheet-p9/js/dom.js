export function initDom(projectList) {
  const container = document.querySelector("#project-list");
  const filterContainer = document.querySelector(".filter-buttons");

  function renderProjects(projects) {
    container.replaceChildren();

    if (projects.length === 0) {
      const message = document.createElement("p");
      message.textContent = "No projects found.";
      container.append(message);
      return;
    }

    const projectElements = projects.map((project) => {
      const article = document.createElement("article");
      const title = document.createElement("h3");
      const year = document.createElement("p");
      const status = document.createElement("p");

      title.textContent = project.title;
      year.textContent = `Year: ${project.year}`;
      status.textContent = project.completed
        ? "Completed"
        : "Ongoing";

      article.append(title, year, status);
      return article;
    });

    container.append(...projectElements);
  }

  filterContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");

    if (!button || !filterContainer.contains(button)) {
      return;
    }

    const category = button.dataset.category;

    const filteredProjects = projectList.filter((project) => {
      if (category === "all") return true;
      if (category === "completed") return project.completed;
      if (category === "ongoing") return !project.completed;
      return false;
    });

    filterContainer.querySelectorAll("button").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    renderProjects(filteredProjects);
  });

  const form = document.querySelector("#guest-form-element");
  const nameInput = document.querySelector("#guest-name");
  const emailInput = document.querySelector("#guest-email");
  const floorInput = document.querySelector("#favorite-floor");
  const submitButton = document.querySelector("#guest-submit");

  const nameError = document.querySelector("#guest-name-error");
  const emailError = document.querySelector("#guest-email-error");
  const floorError = document.querySelector("#favorite-floor-error");
  const successMessage = document.querySelector("#form-success");

  const fields = [
    {
      input: nameInput,
      error: nameError,
      validate() {
        if (!nameInput.value.trim()) {
          return "Guest Name is required.";
        }
        return "";
      },
    },
    {
      input: emailInput,
      error: emailError,
      validate() {
        if (!emailInput.value.trim()) {
          return "Email Address is required.";
        }

        if (!emailInput.validity.valid) {
          return "Please enter a valid email address.";
        }

        return "";
      },
    },
    {
      input: floorInput,
      error: floorError,
      validate() {
        if (!floorInput.value) {
          return "Please choose a floor.";
        }
        return "";
      },
    },
  ];

  function validateField(field) {
    const message = field.validate();

    field.error.textContent = message;
    field.input.setAttribute("aria-invalid", String(Boolean(message)));

    return message === "";
  }

  function updateSubmitButton() {
    const allValid = fields.every((field) => {
      return field.validate() === "";
    });

    submitButton.disabled = !allValid;
  }

  fields.forEach((field) => {
    field.input.addEventListener("input", () => {
      validateField(field);
      successMessage.textContent = "";
      updateSubmitButton();
    });

    field.input.addEventListener("change", () => {
      validateField(field);
      successMessage.textContent = "";
      updateSubmitButton();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    successMessage.textContent = "";

    const results = fields.map((field) => validateField(field));
    const allValid = results.every(Boolean);

    updateSubmitButton();

    if (!allValid) {
      const firstInvalidField = fields.find(
        (field) => field.validate() !== ""
      );

      if (firstInvalidField) {
        firstInvalidField.input.focus();
      }

      return;
    }

    successMessage.textContent =
      "Form submitted successfully.";

    console.log("Valid guest form:", {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      favoriteFloor: floorInput.value,
    });
  });

  updateSubmitButton();
  renderProjects(projectList);

  //renderProjects([]);
  //return;
}