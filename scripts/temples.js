
const yearSpan = document.getElementById("currentYear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


const lastModifiedSpan = document.getElementById("lastModified");
if (lastModifiedSpan) {
  lastModifiedSpan.textContent = document.lastModified;
}


const hamburger = document.getElementById("hamburger");
const mainNav   = document.getElementById("main-nav");

if (hamburger && mainNav) {

  hamburger.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    hamburger.innerHTML = isOpen ? "&#10005;" : "&#9776;";
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      hamburger.innerHTML = "&#9776;";
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 640) {
      mainNav.classList.remove("open");
      hamburger.innerHTML = "&#9776;";
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}
