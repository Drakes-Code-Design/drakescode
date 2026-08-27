document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector(".menu-button");
  const mobileNav = document.querySelector(".mobile-nav");

  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    mobileNav.hidden = true;
    body.classList.remove("menu-open");
  };

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    if (open) return closeMenu();
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close menu");
    mobileNav.hidden = false;
    body.classList.add("menu-open");
  });

  mobileNav
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) closeMenu();
  });
  window.addEventListener(
    "scroll",
    () => header.classList.toggle("scrolled", window.scrollY > 24),
    { passive: true },
  );

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window))
    reveals.forEach((el) => el.classList.add("visible"));
  else {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -30px" },
    );
    reveals.forEach((el) => observer.observe(el));
  }

  const form = document.querySelector("#contact-form");
  const project = document.querySelector("#project-type");
  const budget = document.querySelector("#budget");
  const packageButtons = document.querySelectorAll(".package-button");

  const selectPackage = (service, selectedBudget) => {
    const serviceExists = [...project.options].some(
      (option) => option.value === service,
    );
    const budgetExists = [...budget.options].some(
      (option) => option.value === selectedBudget,
    );

    if (!serviceExists) return false;
    project.value = service;
    budget.value = budgetExists ? selectedBudget : "";
    return true;
  };

  const savedPackage = new URLSearchParams(window.location.search).get(
    "package",
  );
  if (savedPackage) {
    const matchingButton = [...packageButtons].find(
      (button) => button.dataset.service === savedPackage,
    );
    if (matchingButton)
      selectPackage(
        matchingButton.dataset.service,
        matchingButton.dataset.budget,
      );
  }

  packageButtons.forEach((button) =>
    button.addEventListener("click", () => {
      selectPackage(button.dataset.service, button.dataset.budget);
      const url = new URL(window.location.href);
      url.searchParams.set("package", button.dataset.service);
      url.hash = "contact";
      window.history.replaceState(null, "", url);
      document
        .querySelector("#contact")
        .scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      setTimeout(
        () => project.focus({ preventScroll: true }),
        reduceMotion ? 0 : 550,
      );
    }),
  );

  project.addEventListener("change", () => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("package")) return;
    url.searchParams.delete("package");
    window.history.replaceState(null, "", url);
  });

  const validate = (field) => {
    const error = field.parentElement.querySelector("small");
    let message = "";
    if (field.required && !field.value.trim())
      message = "This field is required.";
    else if (
      field.type === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
    )
      message = "Enter a valid email address.";
    else if (field.id === "message" && field.value.trim().length < 10)
      message = "Please share a little more about your project.";
    field.classList.toggle("invalid", Boolean(message));
    field.setAttribute("aria-invalid", String(Boolean(message)));
    if (error) error.textContent = message;
    return !message;
  };

  const fields = [...form.querySelectorAll("input, select, textarea")].filter(
    (el) => el.name !== "company-website",
  );
  fields.forEach((field) => {
    field.addEventListener("blur", () => validate(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("invalid")) validate(field);
    });
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    const valid = fields.map(validate).every(Boolean);
    if (!valid) {
      status.textContent = "Please correct the highlighted fields.";
      status.className = "form-status error";
      form.querySelector(".invalid").focus();
      return;
    }
    if (form.elements["company-website"].value) return;
    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
    button.textContent = "Sending...";
    status.textContent = "";
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok)
        throw new Error("Your inquiry could not be sent. Please try again.");
      form.reset();
      status.textContent =
        "Thank you - your inquiry was sent. I'll be in touch soon.";
      status.className = "form-status success";
    } catch (error) {
      status.textContent = error.message;
      status.className = "form-status error";
    } finally {
      button.disabled = false;
      button.innerHTML = "Send Project Inquiry <span>&nearr;</span>";
    }
  });

  document.querySelector("[data-year]").textContent = new Date().getFullYear();
});
