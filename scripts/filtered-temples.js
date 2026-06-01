const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-5092.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-45813.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/payson-utah-temple/payson-utah-temple-3726.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/yigo-guam-temple/yigo-guam-temple-26495.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/washington-d.c.-temple/washington-d.c.-temple-29514.jpg",
  },
  {
    templeName: "Lima Peru",
    location: "Lima, Peru",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/lima-peru-temple/lima-peru-temple-42066.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/mexico-city-mexico-temple/mexico-city-mexico-temple-4057.jpg",
  },
  
  {
    templeName: "Salt Lake City Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-71185.jpg",
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 40431,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-3547.jpg",
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-5154.jpg",
  },
];

function getYear(dedicatedStr) {
  return parseInt(dedicatedStr.split(",")[0].trim(), 10);
}

function formatArea(sqft) {
  return sqft.toLocaleString("en-US") + " sq ft";
}


const filterFunctions = {
  home:  () => true,
  old:   (t) => getYear(t.dedicated) < 1900,
  new:   (t) => getYear(t.dedicated) > 2000,
  large: (t) => t.area > 90000,
  small: (t) => t.area < 10000,
};

const filterLabels = {
  home:  "All temples",
  old:   "Old Temples (built before 1900)",
  new:   "New Temples (built after 2000)",
  large: "Large Temples (over 90,000 sq ft)",
  small: "Small Temples (under 10,000 sq ft)",
};


function createCard(temple) {
  const article = document.createElement("article");
  article.classList.add("temple-card");

  article.innerHTML = `
    <div class="card-img-wrap">
      <img
        src="${temple.imageUrl}"
        alt="${temple.templeName}"
        loading="lazy"
      />
    </div>
    <div class="card-body">
      <h2 class="card-title">${temple.templeName}</h2>
      <div class="card-meta">
        <div class="meta-item full">
          <span class="meta-label">Location</span>
          <span class="meta-value">${temple.location}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Dedicated</span>
          <span class="meta-value">${temple.dedicated}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Area</span>
          <span class="meta-value">${formatArea(temple.area)}</span>
        </div>
      </div>
    </div>
  `;

  return article;
}


function renderTemples(filter = "home") {
  const gallery = document.getElementById("gallery");
  const filterLabel = document.getElementById("filter-label");
  const countBadge = document.getElementById("count-badge");

  const filtered = temples.filter(filterFunctions[filter]);

  gallery.innerHTML = "";
  filterLabel.textContent = filterLabels[filter];
  countBadge.textContent = filtered.length === 1
    ? "1 temple"
    : `${filtered.length} temples`;

  if (filtered.length === 0) {
    gallery.innerHTML = `
      <div class="empty-state">
        <span class="icon">🕌</span>
        <h2>No temples found</h2>
        <p>No temples match this filter.</p>
      </div>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  filtered.forEach((temple) => fragment.appendChild(createCard(temple)));
  gallery.appendChild(fragment);
}


function initNav() {
  const navLinks = document.querySelectorAll(".nav-link");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      renderTemples(link.dataset.filter);
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}


function initFooter() {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastmod").textContent = document.lastModified;
}


document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initFooter();
  renderTemples("home");
});

function initFooter() {
  document.getElementById("currentYear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
}