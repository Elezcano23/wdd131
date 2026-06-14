const MOTOS = [
    {
        id: 1,
        name: 'Honda CB190R',
        category: 'urban',
        cc: 184,
        price: 'USD 2.800',
        img: 'images/cbr190r.webp',
        desc: "Argentina's best-selling model. Ideal for commuting, low power consumption and easy maintenance.",
    },
    {
        id: 2,
        name: 'Yamaha Tenere 700',
        category: 'adventure',
        cc: 689,
        price: 'USD 12.000',
        img: 'images/tenere700.webp',
        desc: 'A benchmark in the adventure segment. Capable on asphalt and dominant on gravel.',
    },
    {
        id: 3,
        name: 'KTM Duke 390',
        category: 'sport',
        cc: 373,
        price: 'USD 6.500',
        img: 'images/duke390.webp',
        desc: 'Aggressive naked bike with a lightweight design and great urban maneuverability.',
    },
    {
        id: 4,
        name: 'Honda XR 150L',
        category: 'enduro',
        cc: 149,
        price: 'USD 2.200',
        img: 'images/xr150l.webp',
        desc: 'A classic off-road option. Simple, tough, and versatile.',
    },
    {
        id: 5,
        name: 'BMW R 1250 GS',
        category: 'touring',
        cc: 1254,
        price: 'USD 28.000',
        img: 'images/r1250gs.webp',
        desc: 'The icon of global touring. Advanced technology, comfort, and range.',
    },
    {
        id: 6,
        name: 'Kymco AK 550',
        category: 'scooter',
        cc: 550,
        price: 'USD 8.500',
        img: 'images/ak550.webp',
        desc: 'Premium maxi-scooter. Automatic, powerful, and very comfortable for the city.',
    },
    {
        id: 7,
        name: 'Yamaha MT-03',
        category: 'sport',
        cc: 321,
        price: 'USD 5.800',
        img: 'images/mt03.webp',
        desc: 'Entry-level sporty naked bike. Fun, lightweight, and great value.',
    },
    {
        id: 8,
        name: 'Honda Africa Twin',
        category: 'adventure',
        cc: 1084,
        price: 'USD 22.000',
        img: 'images/africatwin.webp',
        desc: 'An adventure legend for long trips and challenging routes.',
    },
    {
        id: 9,
        name: 'Bajaj Pulsar NS200',
        category: 'urban',
        cc: 199,
        price: 'USD 3.200',
        img: 'images/ns200.webp',
        desc: 'Sporty and accessible. Very popular among young Argentine riders.',
    },
];

const CATEGORY_LABELS = {
    urban: 'Urban',
    adventure: 'Adventure',
    sport: 'Sport / Naked',
    enduro: 'Enduro',
    touring: 'Touring',
    scooter: 'Scooter',
};

let activeFilter = 'all';
let favorites = loadFavorites();

function getCategories() {
    return [...new Set(MOTOS.map(moto => moto.category))];
}

function renderFilterBar() {
    const bar = document.getElementById('filter-bar');
    if (!bar) return;

    const cats = getCategories();

    bar.innerHTML = `
        <button class="filter-btn ${activeFilter === 'all' ? 'active' : ''}" data-cat="all">All</button>
        ${cats.map(cat => `
            <button
                class="filter-btn ${activeFilter === cat ? 'active' : ''}"
                data-cat="${cat}"
            >${CATEGORY_LABELS[cat] || cat}</button>
        `).join('')}
    `;

    bar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.dataset.cat;
            renderFilterBar();
            renderCatalog();
        });
    });
}

function filterMotos() {
    if (activeFilter === 'all') return MOTOS;
    return MOTOS.filter(moto => moto.category === activeFilter);
}

function isFavorite(id) {
    return favorites.includes(id);
}

function renderCatalog() {
    const grid = document.getElementById('catalog-grid');
    const counter = document.getElementById('results-count');
    if (!grid) return;

    const list = filterMotos();

    if (counter) {
        counter.textContent = `Showing ${list.length} motorcycle${list.length !== 1 ? 's' : ''}`;
    }

    if (list.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <p>There are no motorcycles in this category yet.</p>
                <button class="btn btn-outline" type="button" id="clear-filter">View All</button>
            </div>
        `;

        const clearButton = document.getElementById('clear-filter');
        if (clearButton) clearButton.addEventListener('click', clearFilter);
        return;
    }

    grid.innerHTML = list.map(moto => `
        <article class="card" id="moto-${moto.id}">
            <img
                class="card-img"
                src="${moto.img}"
                alt="${moto.name}"
                loading="lazy"
            >
            <div class="card-body">
                <span class="card-badge">${CATEGORY_LABELS[moto.category] || moto.category}</span>
                <h2 class="card-title">${moto.name}</h2>
                <div class="card-specs">
                    <span class="spec"><strong>${moto.cc}cc</strong></span>
                    <span class="spec"><strong>${moto.price}</strong></span>
                </div>
                <p class="card-text">${moto.desc}</p>
                <div class="card-actions">
                    <a href="comparison.html?moto=${moto.id}" class="btn-compare">Compare</a>
                    <button
                        class="btn btn-outline fav-btn"
                        data-id="${moto.id}"
                        aria-label="${isFavorite(moto.id) ? 'Remove from favorites' : 'Save to favorites'}"
                    >${isFavorite(moto.id) ? 'Saved' : 'Save'}</button>
                </div>
            </div>
        </article>
    `).join('');

    grid.querySelectorAll('.fav-btn').forEach(btn => {
        btn.addEventListener('click', () => toggleFavorite(Number(btn.dataset.id)));
    });
}

function toggleFavorite(id) {
    if (isFavorite(id)) {
        favorites = favorites.filter(favorite => favorite !== id);
    } else {
        favorites.push(id);
    }

    saveFavorites();
    renderCatalog();
}

function saveFavorites() {
    localStorage.setItem('motoFavorites', JSON.stringify(favorites));
}

function loadFavorites() {
    return JSON.parse(localStorage.getItem('motoFavorites') || '[]');
}

function clearFilter() {
    activeFilter = 'all';
    renderFilterBar();
    renderCatalog();
}

function applyUrlFilter() {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');

    if (cat && (cat === 'all' || MOTOS.some(moto => moto.category === cat))) {
        activeFilter = cat;
    }
}

function setFooterDates() {
    const yearEl = document.getElementById('year');
    const modEl = document.getElementById('last-modified');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (modEl) modEl.textContent = document.lastModified;
}

document.addEventListener('DOMContentLoaded', () => {
    applyUrlFilter();
    renderFilterBar();
    renderCatalog();
    setFooterDates();
});
