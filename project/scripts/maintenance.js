const MAINTENANCE_TIPS = [
    {
        id: 'oil',
        title: 'Engine Oil Change',
        km: 'Every 3,000 km',
        content: `
            Oil is the lifeblood of your engine. Changing it on time prevents
            premature wear of internal components.
            <ul>
                <li>Check the oil type recommended in the owner's manual.</li>
                <li>Replace the oil filter at every oil change.</li>
                <li>Check the oil level with the motorcycle in an upright position.</li>
                <li>Dispose of used oil at an authorized recycling center.</li>
            </ul>
        `,
    },
    {
        id: 'chain',
        title: 'Chain Lubrication and Adjustment',
        km: 'Every 500-1,000 km',
        content: `
            A dry or loose chain reduces power and may break.
            <ul>
                <li>Clean the chain with a brush and a dedicated degreaser.</li>
                <li>Apply chain-specific lubricant.</li>
                <li>Check chain slack: it should have 20-30 mm of play at the midpoint.</li>
                <li>Inspect sprocket wear along with the chain.</li>
            </ul>
        `,
    },
    {
        id: 'brakes',
        title: 'Brake Inspection',
        km: 'Every 5,000 km',
        content: `
            Brakes are the most critical component for your safety. Do not neglect them.
            <ul>
                <li>Check the brake fluid level.</li>
                <li>Inspect brake pad thickness: less than 2 mm means replacement is needed.</li>
                <li>Check that brake discs have no deep grooves or warping.</li>
                <li>Replace brake fluid every 2 years even if mileage is low.</li>
            </ul>
        `,
    },
    {
        id: 'tires',
        title: 'Tire Condition',
        km: 'Monthly Inspection',
        content: `
            Tires are your motorcycle's only contact with the road. Keep them in optimal condition.
            <ul>
                <li>Check tire pressure when the tires are cold.</li>
                <li>Inspect tread depth: below 1.6 mm means replacement is needed.</li>
                <li>Look for cracks, bulges, or sidewall deformations.</li>
                <li>A tire older than 5 years should be inspected carefully or replaced.</li>
            </ul>
        `,
    },
    {
        id: 'air-filter',
        title: 'Air Filter Cleaning / Replacement',
        km: 'Every 10,000 km',
        content: `
            A dirty air filter restricts airflow and reduces performance.
            <ul>
                <li>If it is a paper filter: replace it directly.</li>
                <li>If it is a foam filter: wash it, let it dry completely, and lightly oil it.</li>
                <li>In dusty environments such as gravel roads, inspect it more frequently.</li>
            </ul>
        `,
    },
    {
        id: 'spark-plugs',
        title: 'Spark Plug Inspection',
        km: 'Every 10,000-20,000 km',
        content: `
            Worn spark plugs can cause hard starting and increased fuel consumption.
            <ul>
                <li>Remove and inspect the electrode color: light brown is ideal.</li>
                <li>Black deposits can mean a rich mixture; white can mean a lean mixture or overheating.</li>
                <li>Adjust the spark plug gap according to the owner's manual specifications.</li>
                <li>Always use the spark plug type recommended by the manufacturer.</li>
            </ul>
        `,
    },
];

const CHECKLIST_ITEMS = [
    { id: 'ch-oil', label: 'Change Engine Oil' },
    { id: 'ch-air-filter', label: 'Clean / Replace Air Filter' },
    { id: 'ch-spark-plugs', label: 'Inspect / Replace Spark Plugs' },
    { id: 'ch-chain', label: 'Clean and Lubricate Chain' },
    { id: 'ch-chain-slack', label: 'Adjust Chain Tension' },
    { id: 'ch-brakes', label: 'Inspect Brake Pads and Brake Fluid' },
    { id: 'ch-tires', label: 'Check Tire Pressure' },
    { id: 'ch-lights', label: 'Check Lights and Turn Signals' },
    { id: 'ch-battery', label: 'Inspect Battery and Terminals' },
    { id: 'ch-suspension', label: 'Inspect Suspension' },
];

function renderAccordion() {
    const container = document.getElementById('accordion');
    if (!container) return;

    container.innerHTML = MAINTENANCE_TIPS.map(tip => `
        <div class="accordion-item" id="acc-${tip.id}">
            <button class="accordion-trigger" data-id="${tip.id}" aria-expanded="false">
                <span>${tip.title} <span class="accordion-km">${tip.km}</span></span>
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-body" id="body-${tip.id}" role="region">
                ${tip.content}
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => toggleAccordion(trigger.dataset.id));
    });
}

function toggleAccordion(id) {
    const trigger = document.querySelector(`.accordion-trigger[data-id="${id}"]`);
    const body = document.getElementById(`body-${id}`);
    if (!trigger || !body) return;

    const isOpen = body.classList.contains('open');

    document.querySelectorAll('.accordion-body').forEach(item => item.classList.remove('open'));
    document.querySelectorAll('.accordion-trigger').forEach(item => {
        item.classList.remove('open');
        item.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
        body.classList.add('open');
        trigger.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
    }
}

function loadChecklist() {
    return JSON.parse(localStorage.getItem('serviceChecklist') || '{}');
}

function saveChecklist(state) {
    localStorage.setItem('serviceChecklist', JSON.stringify(state));
}

function renderChecklist() {
    const list = document.getElementById('checklist');
    if (!list) return;

    const state = loadChecklist();

    list.innerHTML = CHECKLIST_ITEMS.map(item => {
        const done = !!state[item.id];
        return `
            <li
                class="checklist-item ${done ? 'done' : ''}"
                data-id="${item.id}"
                role="checkbox"
                aria-checked="${done}"
                tabindex="0"
            >
                <div class="checklist-checkbox">${done ? 'Done' : ''}</div>
                <span class="check-label">${item.label}</span>
            </li>
        `;
    }).join('');

    list.querySelectorAll('.checklist-item').forEach(item => {
        item.addEventListener('click', () => toggleChecklistItem(item.dataset.id));
        item.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleChecklistItem(item.dataset.id);
            }
        });
    });

    updateProgress();
}

function toggleChecklistItem(id) {
    const state = loadChecklist();
    state[id] = !state[id];
    saveChecklist(state);
    renderChecklist();
}

function updateProgress() {
    const state = loadChecklist();
    const total = CHECKLIST_ITEMS.length;
    const done = CHECKLIST_ITEMS.filter(item => !!state[item.id]).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    const fill = document.getElementById('progress-fill');
    const label = document.getElementById('progress-label');

    if (fill) fill.style.width = `${pct}%`;

    if (label) {
        if (done === total) {
            label.textContent = `Service Complete! ${done}/${total} Tasks Completed`;
        } else {
            label.textContent = `${done} of ${total} Tasks Completed (${pct}%)`;
        }
    }
}

function resetChecklist() {
    localStorage.removeItem('serviceChecklist');
    renderChecklist();
}

function setFooterDates() {
    const yearEl = document.getElementById('year');
    const modEl = document.getElementById('last-modified');

    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (modEl) modEl.textContent = document.lastModified;
}

document.addEventListener('DOMContentLoaded', () => {
    renderAccordion();
    renderChecklist();
    setFooterDates();

    const resetBtn = document.getElementById('reset-checklist');

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Reset the maintenance checklist?')) {
                resetChecklist();
            }
        });
    }
});
