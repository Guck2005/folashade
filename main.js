(() => {
  const navbar = document.querySelector(".navbar");
  const toggle = document.querySelector(".navbar__toggle");
  const backdrop = document.querySelector(".navbar__backdrop");
  const panel = document.getElementById("menu-principal");

  if (!navbar || !toggle || !backdrop || !panel) return;

  const mq = window.matchMedia("(max-width: 900px)");

  function syncInert() {
    if (!mq.matches) {
      panel.removeAttribute("inert");
      return;
    }
    if (navbar.classList.contains("is-open")) {
      panel.removeAttribute("inert");
    } else {
      panel.setAttribute("inert", "");
    }
  }

  function setOpen(open) {
    navbar.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Fermer le menu" : "Ouvrir le menu"
    );
    backdrop.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
    syncInert();
  }

  function closeMenu() {
    setOpen(false);
  }

  toggle.addEventListener("click", () => {
    if (!mq.matches) return;
    setOpen(!navbar.classList.contains("is-open"));
  });

  backdrop.addEventListener("click", closeMenu);

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mq.matches) closeMenu();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navbar.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  mq.addEventListener("change", (e) => {
    if (!e.matches) {
      closeMenu();
    }
    syncInert();
  });

  syncInert();
})();
