const yearEl = document.getElementById('year');
const modifiedEl = document.getElementById('last-modified');

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modifiedEl) modifiedEl.textContent = document.lastModified;
