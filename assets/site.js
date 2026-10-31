const bar = document.querySelector(".bar");
const btn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");

function setBar() {
  if (bar) bar.classList.toggle("scrolled", window.scrollY > 8);
}
setBar();
window.addEventListener("scroll", setBar, { passive: true });

function closeNav() {
  if (!nav || !btn) return;
  nav.classList.remove("open");
  btn.setAttribute("aria-expanded", "false");
}

if (btn && nav) {
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });
}

document.querySelectorAll("[data-tabs]").forEach((group) => {
  const buttons = group.querySelectorAll("[data-tab]");
  const panels = group.parentElement.querySelectorAll("[data-panel]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.tab;
      buttons.forEach((item) => item.setAttribute("aria-selected", String(item === button)));
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.panel !== name;
      });
    });
  });
});

const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    if (note) note.textContent = "Opening your email app with this message.";
    window.location.href =
      "mailto:jitennakum.ja@gmail.com?subject=" +
      encodeURIComponent("Project enquiry from " + name) +
      "&body=" +
      encodeURIComponent(body);
  });
}

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
