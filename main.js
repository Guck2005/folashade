(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function finishPageLoaderInstant() {
    document.body.classList.remove("is-loading");
    const root = document.getElementById("page-loader");
    if (root) {
      root.classList.add("is-done");
      root.setAttribute("aria-hidden", "true");
      root.setAttribute("aria-busy", "false");
    }
  }

  function finishPageLoaderWithFade() {
    const root = document.getElementById("page-loader");
    document.body.classList.remove("is-loading");
    if (!root || !window.gsap) {
      finishPageLoaderInstant();
      return;
    }
    window.gsap.to(root, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => {
        root.classList.add("is-done");
        root.setAttribute("aria-hidden", "true");
        root.setAttribute("aria-busy", "false");
        window.gsap.set(root, { clearProps: "opacity" });
      },
    });
  }

  function initPageLoader() {
    const root = document.getElementById("page-loader");
    if (!root) {
      document.body.classList.remove("is-loading");
      return;
    }

    if (prefersReducedMotion.matches || !window.gsap) {
      finishPageLoaderInstant();
      return;
    }

    const { gsap } = window;

    let imageReady = false;
    let timelineReady = false;
    let finished = false;

    function tryFinishLoader() {
      if (finished || !imageReady || !timelineReady) return;
      finished = true;
      finishPageLoaderWithFade();
    }

    const heroImg = document.querySelector(".hero__photo.img");
    const imageFallbackMs = 20000;
    const imageFallbackTimer = window.setTimeout(() => {
      if (!imageReady) markImageReady();
    }, imageFallbackMs);

    function markImageReady() {
      window.clearTimeout(imageFallbackTimer);
      if (imageReady) return;
      imageReady = true;
      tryFinishLoader();
    }

    gsap.to(".block", {
      duration: 0.8,
      width: "6%",
      ease: Power1.easeIn,
      delay: 2,
      stagger: 0.04,
    });

    gsap.to(".loader", {
      duration: 1,
      opacity: 0,
      ease: Expo.easeInOut,
      delay: 1.5,
    });

    gsap.from(
      ".navbar__brand, .navbar__nav a, .navbar__cta, .navbar__toggle, .hero__kicker, .hero__heading, .hero__projects",
      {
        duration: 2,
        opacity: 0,
        y: 30,
        ease: Expo.easeInOut,
        delay: 3,
        stagger: 0.06,
      }
    );

    gsap.to(".box", {
      duration: 0.2,
      opacity: 1,
      ease: Expo.easeInOut,
      delay: 3.8,
    });

    gsap.to(".img", {
      duration: 0.2,
      opacity: 1,
      ease: Expo.easeInOut,
      delay: 4,
    });

    gsap.to(".box", {
      duration: 2.4,
      y: "-100%",
      ease: Expo.easeInOut,
      delay: 4,
      onComplete: () => {
        timelineReady = true;
        tryFinishLoader();
      },
    });

    if (heroImg) {
      if (heroImg.complete && heroImg.naturalWidth > 0) {
        markImageReady();
      } else {
        heroImg.addEventListener("load", markImageReady, { once: true });
        heroImg.addEventListener("error", markImageReady, { once: true });
      }
    } else {
      markImageReady();
    }
  }

  initPageLoader();

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
