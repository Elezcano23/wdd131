(function initConfirmPage() {
  const STORAGE_KEY = "reviewCount";
  let count = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
  count += 1;
  localStorage.setItem(STORAGE_KEY, count);

  const countEl = document.getElementById("review-count");
  if (countEl) countEl.textContent = count;

  const params = new URLSearchParams(window.location.search);

  const productId    = params.get("productName")   || "—";
  const rating       = params.get("rating")         || "—";
  const installDate  = params.get("installDate")    || "—";
  const featuresRaw  = params.getAll("features");
  const writtenReview = params.get("writtenReview") || "";
  const userName     = params.get("userName")       || "Anonymous";

  const ratingNum = parseInt(rating, 10);
  const stars = isNaN(ratingNum)
    ? "—"
    : "★".repeat(ratingNum) + "☆".repeat(5 - ratingNum);

  const featuresDisplay = featuresRaw.length > 0
    ? featuresRaw.join(", ")
    : "None selected";

  let dateDisplay = installDate;
  if (installDate && installDate !== "—") {
    const d = new Date(installDate + "T00:00:00"); // avoid timezone shift
    dateDisplay = d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  const summaryEl = document.getElementById("review-summary");
  if (!summaryEl) return;

  const rows = [
    { key: "Product ID",   val: productId },
    { key: "Rating",       val: stars + (isNaN(ratingNum) ? "" : ` (${ratingNum}/5)`) },
    { key: "Installed",    val: dateDisplay },
    { key: "Features",     val: featuresDisplay },
    { key: "Reviewer",     val: userName },
  ];

  if (writtenReview.trim()) {
    rows.push({ key: "Review", val: writtenReview.trim() });
  }

  summaryEl.innerHTML = rows.map(function (row) {
    return `<div class="summary-row">
      <span class="summary-key">${row.key}</span>
      <span class="summary-val">${escapeHtml(row.val)}</span>
    </div>`;
  }).join("");
})();

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

//get last modified
document.getElementById("currentyear").textContent = new Date ().getFullYear();

document.getElementById("lastModified").innerHTML = document.lastModified;
