const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

async function loadData() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("Unable to load data.json");
    }
    const data = await response.json();
    applyTheme(data.theme);
    renderContent(data);
  } catch (error) {
    console.error("Failed to load site data:", error);
  }
}

function applyTheme(theme) {
  if (!theme) {
    return;
  }
  const root = document.documentElement;
  Object.entries(theme.colors || {}).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  if (theme.fonts) {
    root.style.setProperty("--font-heading", theme.fonts.heading);
    root.style.setProperty("--font-body", theme.fonts.body);
  }
  if (theme.radius) {
    root.style.setProperty("--radius", theme.radius);
  }
  if (theme.shadow) {
    root.style.setProperty("--shadow", theme.shadow);
  }
}

function renderContent(data) {
  const pageTitle = document.title.split("|")[0].trim();
  document.title = `${data.restaurant.name} | ${pageTitle}`;
  setText("site-name", data.restaurant.name);
  setText("site-tagline", data.restaurant.tagline);
  setText("footer-name", data.restaurant.name);
  setText("footer-tagline", data.restaurant.tagline);

  setText("hero-eyebrow", data.hero.eyebrow);
  setText("hero-title", data.hero.title);
  setText("hero-subtitle", data.hero.subtitle);
  setLink("hero-primary", data.hero.primaryCta.link, data.hero.primaryCta.label);
  setLink("hero-secondary", data.hero.secondaryCta.link, data.hero.secondaryCta.label);
  setBackgroundImage("hero-image", data.hero.image);

  setText("about-description", data.about.description);
  setBackgroundImage("about-image", data.about.image);
  renderPills("about-pills", data.about.highlights);

  setText("menu-description", data.menu?.description);
  if (data.menu?.pdf) {
    setLink("menu-pdf", data.menu.pdf.link, data.menu.pdf.label);
  } else {
    hideElement("menu-pdf");
  }
  if (data.menu?.categories) {
    renderMenu("menu-grid", data.menu.categories);
  }

  setText("specials-description", data.specials.description);
  renderCards("specials-grid", data.specials.items, "special-card");

  setText("gallery-description", data.gallery.description);
  renderGallery("gallery-grid", data.gallery.images);

  setText("testimonial-description", data.testimonials.description);
  renderTestimonials("testimonials-grid", data.testimonials.items);

  setText("events-description", data.events.description);
  renderCards("events-grid", data.events.items, "event-card");

  setText("contact-description", data.contact.description);
  setText("contact-address", data.contact.address);
  setText("contact-phone", data.contact.phone);
  setText("contact-email", data.contact.email);
  setLink("map-link", data.contact.mapLink, "Get Directions");
  renderHours("hours-list", data.contact.hours);

  renderNavLinks(data.navigation);
  renderHeroStats("hero-stats", data.hero.stats);
  renderFooterLinks("footer-links", data.footerLinks);

  setLink("order-link", data.actions.orderOnline.link, data.actions.orderOnline.label);
  setLink("reserve-link", data.actions.reserve.link, data.actions.reserve.label);
  setText("footer-note", data.footerNote);
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function setLink(id, href, label) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }
  if (!href) {
    element.style.display = "none";
    return;
  }
  if (label) {
    element.textContent = label;
  }
  element.setAttribute("href", href);
  element.setAttribute("target", "_blank");
  element.setAttribute("rel", "noopener");
}

function setBackgroundImage(id, url) {
  const element = document.getElementById(id);
  if (element) {
    element.style.backgroundImage = `url('${url}')`;
  }
}

function hideElement(id) {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "none";
  }
}

function renderNavLinks(links) {
  if (!navLinks) {
    return;
  }
  navLinks.innerHTML = "";
  links.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = link.label;
    navLinks.appendChild(anchor);
  });
}

function renderPills(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }
  container.innerHTML = "";
  items.forEach((item) => {
    const span = document.createElement("span");
    span.className = "pill";
    span.textContent = item;
    container.appendChild(span);
  });
}

function renderMenu(containerId, categories) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }
  container.innerHTML = "";
  categories.forEach((category) => {
    const card = document.createElement("article");
    card.className = "menu-card";
    const title = document.createElement("h3");
    title.textContent = category.name;
    const description = document.createElement("p");
    description.textContent = category.description;
    card.appendChild(title);
    card.appendChild(description);
    category.items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "menu-item";
      row.innerHTML = `<div><strong>${item.name}</strong><br /><small>${item.description}</small></div><span>${item.price}</span>`;
      card.appendChild(row);
    });
    container.appendChild(card);
  });
}

function renderCards(containerId, items, className) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }
  container.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = className;
    card.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p><span>${item.detail}</span>`;
    container.appendChild(card);
  });
}

function renderGallery(containerId, images) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }
  container.innerHTML = "";
  images.forEach((image) => {
    const item = document.createElement("div");
    item.className = "gallery__item";
    item.innerHTML = `<img src="${image.url}" alt="${image.alt}" />`;
    container.appendChild(item);
  });
}

function renderTestimonials(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }
  container.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "testimonial-card";
    card.innerHTML = `<p>"${item.quote}"</p><span>${item.name}</span><small>${item.title}</small>`;
    container.appendChild(card);
  });
}

function renderHours(containerId, hours) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }
  container.innerHTML = "";
  hours.forEach((day) => {
    const row = document.createElement("div");
    row.className = "menu-item";
    row.innerHTML = `<div>${day.day}</div><span>${day.hours}</span>`;
    container.appendChild(row);
  });
}

function renderHeroStats(containerId, stats) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }
  container.innerHTML = "";
  stats.forEach((stat) => {
    const card = document.createElement("div");
    card.className = "stat";
    card.innerHTML = `<span>${stat.value}</span>${stat.label}`;
    container.appendChild(card);
  });
}

function renderFooterLinks(containerId, links) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }
  container.innerHTML = "";
  links.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = link.label;
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener");
    container.appendChild(anchor);
  });
}

loadData();
