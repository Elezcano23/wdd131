const MOTOS = [
    {
        id: 1,
        name: 'Honda CB190R',
        category: 'Urban',
        cc: 184,
        power: '16 HP',
        weight: '138 kg',
        price: 'USD 2.800',
        consumption: '30 km/l',
        img: 'images/cbr190r.webp',
        pros: ['Low consumption', 'Affordable spare parts', 'Easy to handle'],
        cons: ['Limited power', 'Not suitable for highway use'],
    },
    {
        id: 2,
        name: 'Yamaha Tenere 700',
        category: 'Adventure',
        cc: 689,
        power: '72 HP',
        weight: '204 kg',
        price: 'USD 12.000',
        consumption: '20 km/l',
        img: 'images/tenere700.webp',
        pros: ['Versatile on-road/off-road', 'Long range', 'Highly reliable'],
        cons: ['High price', 'Too heavy for beginners'],
    },
    {
        id: 3,
        name: 'KTM Duke 390',
        category: 'Sport',
        cc: 373,
        power: '44 HP',
        weight: '149 kg',
        price: 'USD 6.500',
        consumption: '22 km/l',
        img: 'images/duke390.webp',
        pros: ['Very lightweight', 'Great urban handling', 'Aggressive design'],
        cons: ['Somewhat aggressive stance', 'Expensive spare parts'],
    },
    {
        id: 4,
        name: 'Honda XR 150L',
        category: 'Enduro',
        cc: 149,
        power: '13 HP',
        weight: '120 kg',
        price: 'USD 2.200',
        consumption: '35 km/l',
        img: 'images/xr150l.webp',
        pros: ['Very lightweight', 'Capable off-road', 'Economical'],
        cons: ['Low power on the road', 'Not comfortable at high speed'],
    },
    {
        id: 5,
        name: 'BMW R 1250 GS',
        category: 'Touring',
        cc: 1254,
        power: '136 HP',
        weight: '249 kg',
        price: 'USD 28.000',
        consumption: '18 km/l',
        img: 'images/r1250gs.webp',
        pros: ['Advanced technology', 'Very comfortable', 'Excellent on the road'],
        cons: ['Very high price', 'Too heavy for dirt roads'],
    },
    {
        id: 6,
        name: 'Kymco AK 550',
        category: 'Scooter',
        cc: 550,
        power: '52 HP',
        weight: '238 kg',
        price: 'USD 8.500',
        consumption: '22 km/l',
        img: 'images/ak550.webp',
        pros: ['Automatic', 'Very comfortable', 'Integrated storage'],
        cons: ['Heavy', 'Not suitable for off-road'],
    },
    {
        id: 7,
        name: 'Yamaha MT-03',
        category: 'Sport',
        cc: 321,
        power: '42 HP',
        weight: '168 kg',
        price: 'USD 5.800',
        consumption: '24 km/l',
        img: 'images/mt03.webp',
        pros: ['Aggressive style', 'Agile in the city', 'Good price'],
        cons: ["It is a bit stiff for long journeys"],
    },
    {
        id: 8,
        name: 'Honda Africa Twin',
        category: 'Adventure',
        cc: 1084,
        power: '101 HP',
        weight: '226 kg',
        price: 'USD 22.000',
        consumption: '19 km/l',
        img: 'images/africatwin.webp',
        pros: ['Adventure icon', 'Powerful and reliable', 'Great equipment'],
        cons: ['Expensive', 'Too big for beginners'],
    },
    {
        id: 9,
        name: 'Bajaj Pulsar NS200',
        category: 'Urban',
        cc: 199,
        power: '24 HP',
        weight: '156 kg',
        price: 'USD 3.200',
        consumption: '26 km/l',
        img: 'images/ns200.webp',
        pros: ['Good power for the engine size', 'Affordable price', 'Sporty design'],
        cons: ['Average material quality', 'Somewhat stiff suspension'],
    },
];

const SPEC_ROWS = [
    { key: 'category', label: 'Category' },
    { key: 'cc', label: 'CC', suffix: ' cc' },
    { key: 'power', label: 'Power' },
    { key: 'weight', label: 'Weight' },
    { key: 'consumption', label: 'Approx. Consumption' },
    { key: 'price', label: 'Approx. Price' },
];

function populateSelects() {
    const selA = document.getElementById('select-a');
    const selB = document.getElementById('select-b');
    if (!selA || !selB) return;

    const options = MOTOS.map(moto => `<option value="${moto.id}">${moto.name}</option>`).join('');
    selA.innerHTML += options;
    selB.innerHTML += options;
}

function getMotoById(id) {
    return MOTOS.find(moto => moto.id === Number(id)) || null;
}

function buildSpecRow(label, valA, valB, suffix = '') {
    return `
        <tr>
            <td>${label}</td>
            <td>${valA}${suffix}</td>
            <td>${valB}${suffix}</td>
        </tr>
    `;
}

function buildImageRow(motoA, motoB) {
    return `
        <tr>
            <td></td>
            <td class="comp-img-cell">
                <img class="comp-img" src="${motoA.img}" alt="${motoA.name}" loading="lazy">
            </td>
            <td class="comp-img-cell">
                <img class="comp-img" src="${motoB.img}" alt="${motoB.name}" loading="lazy">
            </td>
        </tr>
    `;
}

function buildListRow(label, listA, listB) {
    const toUl = items => `<ul class="comp-list">
        ${items.map(item => `<li>${item}</li>`).join('')}
    </ul>`;

    return `
        <tr>
            <td>${label}</td>
            <td>${toUl(listA)}</td>
            <td>${toUl(listB)}</td>
        </tr>
    `;
}

function determineWinner(motoA, motoB) {
    const hpA = parseInt(motoA.power, 10);
    const hpB = parseInt(motoB.power, 10);

    if (hpA > hpB) return motoA.name;
    if (hpB > hpA) return motoB.name;
    return null;
}

function renderComparison(motoA, motoB) {
    const result = document.getElementById('comparison-result');
    if (!result) return;

    const winner = determineWinner(motoA, motoB);
    const specRows = SPEC_ROWS.map(row =>
        buildSpecRow(row.label, motoA[row.key], motoB[row.key], row.suffix || '')
    ).join('');

    result.innerHTML = `
        <div class="comp-header">
            <div class="comp-header-cell">Specification</div>
            <div class="comp-header-cell">${motoA.name}</div>
            <div class="comp-header-cell">${motoB.name}</div>
        </div>
        <table class="comp-table">
            <tbody>
                ${buildImageRow(motoA, motoB)}
                ${specRows}
                ${buildListRow('Advantages', motoA.pros, motoB.pros)}
                ${buildListRow('Disadvantages', motoA.cons, motoB.cons)}
            </tbody>
        </table>
        <div class="comp-footer">
            ${winner
                ? `<h3>Greater power: <strong>${winner}</strong></h3>
                   <p>This comparison is for guidance only. The best motorcycle depends on your specific needs.</p>`
                : `<h3>It is a tie in power!</h3>
                   <p>Both are excellent options depending on your riding style.</p>`
            }
            <div class="comp-footer-action">
                <a href="catalog.html" class="btn btn-outline">See more motorcycles</a>
            </div>
        </div>
    `;

    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    saveLastComparison(motoA.id, motoB.id);
}

function saveLastComparison(idA, idB) {
    localStorage.setItem('lastComparison', JSON.stringify({ idA, idB }));
}

function loadLastComparison() {
    const saved = JSON.parse(localStorage.getItem('lastComparison') || 'null');
    if (!saved) return;

    const selA = document.getElementById('select-a');
    const selB = document.getElementById('select-b');
    if (selA) selA.value = saved.idA;
    if (selB) selB.value = saved.idB;
}

function applyUrlParam() {
    const params = new URLSearchParams(location.search);
    const motoId = params.get('moto');
    if (!motoId) return;

    const selA = document.getElementById('select-a');
    if (selA) selA.value = motoId;
}

function setFooterDates() {
    const yearEl = document.getElementById('year');
    const modEl = document.getElementById('last-modified');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (modEl) modEl.textContent = document.lastModified;
}

document.addEventListener('DOMContentLoaded', () => {
    populateSelects();
    applyUrlParam();
    loadLastComparison();
    setFooterDates();

    const comparisonForm = document.getElementById('comparison-form');
    if (comparisonForm) {
        comparisonForm.addEventListener('submit', event => {
            event.preventDefault();

            const idA = document.getElementById('select-a').value;
            const idB = document.getElementById('select-b').value;

            if (!idA || !idB) {
                alert('Select two motorcycles to compare.');
                return;
            }

            if (idA === idB) {
                alert('Choose two different motorcycles.');
                return;
            }

            const motoA = getMotoById(idA);
            const motoB = getMotoById(idB);

            if (motoA && motoB) renderComparison(motoA, motoB);
        });
    }
});
