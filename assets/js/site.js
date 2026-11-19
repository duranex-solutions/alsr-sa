/* ALSR site script: mobile nav, nav scroll-spy (home), one-shot reveal, footer year.
   Progressive enhancement only: every page works with JS off. */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Mobile navigation (disclosure pattern) ---- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (toggle && nav) {
    const desktop = window.matchMedia("(min-width: 961px)");

    const setOpen = (open, { returnFocus = false } = {}) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (!open && returnFocus) toggle.focus();
    };

    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false, { returnFocus: true });
      }
    });

    document.addEventListener("click", (event) => {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    // Close if the viewport grows past the mobile breakpoint
    desktop.addEventListener("change", (event) => {
      if (event.matches) setOpen(false);
    });
  }

  /* ---- Active state on the home page: highlight the nav link for the section in view ---- */
  const isHome = !/(gallery|videos|404)(\.html)?$/.test(location.pathname);
  if (isHome && "IntersectionObserver" in window) {
    const links = new Map();
    document.querySelectorAll(".site-nav a[href^='index.html#']").forEach((link) => {
      const section = document.getElementById(link.getAttribute("href").split("#")[1]);
      if (section) links.set(section, link);
    });

    if (links.size) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const link = links.get(entry.target);
            if (!link) return;
            if (entry.isIntersecting) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      links.forEach((_, section) => spy.observe(section));
    }
  }

  /* ---- One-shot reveal: runs once per block and never hides content without JS ---- */
  if ("IntersectionObserver" in window && !reduceMotion) {
    const targets = document.querySelectorAll(
      "main > section:not(.hero):not(.interior-hero) > .container, main > section.band > .container",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" },
    );

    targets.forEach((target) => {
      target.classList.add("reveal");
      observer.observe(target);
    });
  }

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
