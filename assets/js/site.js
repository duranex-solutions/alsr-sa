/* ALSR site script: mobile nav, nav scroll-spy (home), one-shot reveal, quote form, footer year.
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

  /* ---- Quote form (Web3Forms). Without JS the form posts normally to Web3Forms. ---- */
  const form = document.querySelector("[data-quote-form]");
  if (form && "fetch" in window) {
    const status = form.querySelector(".form-status");
    const submit = form.querySelector("[type='submit']");
    const submitLabel = submit ? submit.textContent : "";
    const fallback =
      'Please email <a href="mailto:tiaan.alsr@gmail.com,sales.alsr@gmail.com?subject=Enquiry">Tiaan and Anne-Marie</a> ' +
      'or WhatsApp <a href="https://wa.me/27826141820" target="_blank" rel="noopener noreferrer">082 614 1820</a> instead.';

    const setStatus = (type, html) => {
      status.classList.toggle("is-ok", type === "ok");
      status.classList.toggle("is-error", type === "error");
      status.innerHTML = html;
    };

    // Flag invalid fields for assistive tech; clear the flag once the visitor edits them
    form.addEventListener("invalid", (event) => event.target.setAttribute("aria-invalid", "true"), true);
    form.addEventListener("input", (event) => {
      if (event.target.validity && event.target.validity.valid) event.target.removeAttribute("aria-invalid");
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const key = form.elements.access_key ? form.elements.access_key.value : "";
      if (!key || key.includes("[[")) {
        setStatus("error", "The online form isn't connected yet. " + fallback);
        return;
      }

      submit.disabled = true;
      submit.textContent = "Sending…";
      setStatus("", "");

      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.success) throw new Error(result.message || "Request failed");
        form.reset();
        setStatus("ok", "Thanks, your enquiry has been sent. We'll be in touch soon.");
      } catch (error) {
        setStatus("error", "Sorry, your request couldn't be sent. " + fallback);
      } finally {
        submit.disabled = false;
        submit.textContent = submitLabel;
      }
    });
  }

  /* ---- Lightbox: links with [data-lightbox] open in a native <dialog>.
          Without JS they simply open the large image. ---- */
  const lightboxLinks = Array.from(document.querySelectorAll("a[data-lightbox]"));
  if (lightboxLinks.length && "HTMLDialogElement" in window) {
    const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
    const dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Photo viewer");
    dialog.innerHTML =
      '<button class="lightbox-button lightbox-close" type="button" aria-label="Close photo viewer">' + icon("close") + "</button>" +
      '<figure class="lightbox-figure"><img alt="" /></figure>' +
      '<div class="lightbox-bar">' +
      '<button class="lightbox-button lightbox-prev" type="button" aria-label="Previous photo">' + icon("chevron-left") + "</button>" +
      '<p class="lightbox-caption" aria-live="polite"><span class="lightbox-text"></span><span class="lightbox-count"></span></p>' +
      '<button class="lightbox-button lightbox-next" type="button" aria-label="Next photo">' + icon("chevron-right") + "</button>" +
      "</div>";
    document.body.append(dialog);

    const image = dialog.querySelector("img");
    const text = dialog.querySelector(".lightbox-text");
    const count = dialog.querySelector(".lightbox-count");
    const closeButton = dialog.querySelector(".lightbox-close");
    const prevButton = dialog.querySelector(".lightbox-prev");
    const nextButton = dialog.querySelector(".lightbox-next");
    let index = 0;

    const preload = (i) => {
      const link = lightboxLinks[(i + lightboxLinks.length) % lightboxLinks.length];
      new Image().src = link.href;
    };

    const show = (i) => {
      index = (i + lightboxLinks.length) % lightboxLinks.length;
      const link = lightboxLinks[index];
      const thumb = link.querySelector("img");
      image.src = link.href;
      image.alt = thumb ? thumb.alt : "";
      text.textContent = link.dataset.caption || "";
      count.textContent = `Photo ${index + 1} of ${lightboxLinks.length}`;
      preload(index + 1);
      preload(index - 1);
    };

    const step = (by) => show(index + by);
    if (lightboxLinks.length < 2) prevButton.hidden = nextButton.hidden = true;

    lightboxLinks.forEach((link, i) => {
      link.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey) return; // let "open in new tab" work
        event.preventDefault();
        show(i);
        dialog.showModal();
        closeButton.focus();
      });
    });

    closeButton.addEventListener("click", () => dialog.close());
    prevButton.addEventListener("click", () => step(-1));
    nextButton.addEventListener("click", () => step(1));

    // Click on the dark area (outside the photo and controls) closes the viewer
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog || event.target.classList.contains("lightbox-figure")) dialog.close();
    });

    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
      else if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
      else if (event.key === "Home") { event.preventDefault(); show(0); }
      else if (event.key === "End") { event.preventDefault(); show(lightboxLinks.length - 1); }
    });

    // Swipe on touch screens
    let touchX = null;
    dialog.addEventListener("touchstart", (event) => { touchX = event.touches[0].clientX; }, { passive: true });
    dialog.addEventListener("touchend", (event) => {
      if (touchX === null) return;
      const dx = event.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    }, { passive: true });

    // Esc closes natively; hand focus back to the photo that was last viewed
    dialog.addEventListener("close", () => {
      image.removeAttribute("src");
      lightboxLinks[index].focus({ preventScroll: false });
    });
  }

  /* ---- YouTube click-to-load facades: the player (privacy-enhanced domain) loads only on click.
          Without JS the link opens the video on YouTube. ---- */
  document.querySelectorAll("a.video-facade[data-video-id]").forEach((facade) => {
    facade.setAttribute("role", "button");

    const load = (event) => {
      event.preventDefault();
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${facade.dataset.videoId}?autoplay=1&rel=0&playsinline=1`;
      iframe.title = facade.dataset.videoTitle || "Video";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      facade.replaceWith(iframe);
      iframe.focus();
    };

    facade.addEventListener("click", load);
    facade.addEventListener("keydown", (event) => {
      if (event.key === " ") load(event); // links activate on Enter; role=button should also take Space
    });
  });

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
