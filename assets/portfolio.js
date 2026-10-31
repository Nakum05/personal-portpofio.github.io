const splash = document.getElementById("splash");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (splash && !reduceMotion) {
  window.setTimeout(() => {
    splash.classList.add("done");
    window.setTimeout(() => splash.remove(), 600);
  }, 1700);
} else if (splash) {
  splash.remove();
}

const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav-links");

function closeNav() {
  if (!nav || !toggle) return;
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });
}

const bars = document.querySelectorAll(".meter");
function fillBars() {
  bars.forEach((bar) => {
    const fill = bar.querySelector("i");
    if (fill) fill.style.width = (bar.dataset.level || "0") + "%";
  });
}

if (reduceMotion || !("IntersectionObserver" in window)) {
  fillBars();
} else {
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const fill = entry.target.querySelector("i");
        if (fill) fill.style.width = (entry.target.dataset.level || "0") + "%";
        barObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((bar) => barObserver.observe(bar));
}

const form = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    if (formNote) formNote.textContent = "Opening your email app with this message.";
    window.location.href =
      "mailto:jitennakum.ja@gmail.com?subject=" +
      encodeURIComponent("App inquiry from " + name) +
      "&body=" +
      encodeURIComponent(body);
  });
}

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const toTop = document.getElementById("to-top");
if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
