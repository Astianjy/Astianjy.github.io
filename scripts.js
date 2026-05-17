(() => {
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActive = () => {
    const offset = 120;
    let activeId = "";
    for (const section of sections) {
      if (section.offsetTop <= window.scrollY + offset) {
        activeId = section.id;
      }
    }
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
  };

  let ticking = false;
  const schedule = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      setActive();
    });
  };

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  setActive();
})();

(() => {
  const buttons = [...document.querySelectorAll("[data-density]")];
  if (!buttons.length) return;

  const apply = (value) => {
    document.body.dataset.density = value;
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.density === value));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => apply(button.dataset.density));
  });

  apply("full");
})();

(() => {
  const button = document.querySelector("[data-copy-hash]");
  const target = document.querySelector("#artifact-hash");
  if (!button || !target) return;

  button.addEventListener("click", async () => {
    const value = target.textContent.trim();
    try {
      await navigator.clipboard.writeText(value);
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = "Copy hash";
      }, 1400);
    } catch {
      button.textContent = "Select hash";
      window.setTimeout(() => {
        button.textContent = "Copy hash";
      }, 1400);
    }
  });
})();
