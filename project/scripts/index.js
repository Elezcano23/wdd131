const categories = [
    {
        id: 'urban',
        icon: 'City',
        title: 'Urban',
        desc: 'Light, efficient motorcycles for commuting and everyday city riding.',
    },
    {
        id: 'adventure',
        icon: 'ADV',
        title: 'Adventure',
        desc: 'Versatile motorcycles for asphalt, gravel roads, and long explorations.',
    },
    {
        id: 'sport',
        icon: 'Sport',
        title: 'Sport / Naked',
        desc: 'Responsive motorcycles for riders who want agility and performance.',
    },
    {
        id: 'enduro',
        icon: 'Trail',
        title: 'Enduro',
        desc: 'Simple, tough motorcycles made for dirt roads and off-road routes.',
    },
    {
        id: 'touring',
        icon: 'Tour',
        title: 'Touring',
        desc: 'Comfort-focused motorcycles for highways and long-distance travel.',
    },
    {
        id: 'scooter',
        icon: 'Auto',
        title: 'Scooter',
        desc: 'Automatic, practical motorcycles for relaxed urban transportation.',
    },
];

const motorcycles = [
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
];

const quizQuestions = [
    {
        text: 'Where will you ride most often?',
        options: [
            { text: 'City streets and traffic', category: 'urban' },
            { text: 'Highways and long trips', category: 'touring' },
            { text: 'Mixed asphalt and gravel', category: 'adventure' },
            { text: 'Dirt roads and trails', category: 'enduro' },
        ],
    },
    {
        text: 'What matters most to you?',
        options: [
            { text: 'Low fuel consumption', category: 'urban' },
            { text: 'Comfort for many hours', category: 'touring' },
            { text: 'Sporty acceleration', category: 'sport' },
            { text: 'Easy automatic riding', category: 'scooter' },
        ],
    },
    {
        text: 'How much riding experience do you have?',
        options: [
            { text: 'I am starting out', category: 'urban' },
            { text: 'Some experience', category: 'scooter' },
            { text: 'I ride often', category: 'adventure' },
            { text: 'I want a challenge', category: 'sport' },
        ],
    },
    {
        text: 'What type of motorcycle feels more useful to you?',
        options: [
            { text: 'Simple and reliable', category: 'urban' },
            { text: 'Comfortable and powerful', category: 'touring' },
            { text: 'Ready for any road', category: 'adventure' },
            { text: 'Light and tough', category: 'enduro' },
        ],
    },
];

const quizResults = {
    urban: {
        title: 'Urban',
        desc: 'An urban motorcycle is practical, economical, and easy to handle in traffic. It is a great fit for daily transportation.',
    },
    adventure: {
        title: 'Adventure',
        desc: 'An adventure motorcycle gives you flexibility for highways, gravel, and longer trips without giving up comfort.',
    },
    sport: {
        title: 'Sport / Naked',
        desc: 'A sport or naked motorcycle fits riders who want quick response, agility, and a more exciting riding style.',
    },
    enduro: {
        title: 'Enduro',
        desc: 'An enduro motorcycle is light, resistant, and ideal for riders who expect dirt roads, trails, and rough terrain.',
    },
    touring: {
        title: 'Touring',
        desc: 'A touring motorcycle is best for long-distance comfort, stability, luggage capacity, and highway riding.',
    },
    scooter: {
        title: 'Scooter',
        desc: 'A scooter is comfortable, automatic, and very practical for city riding with less effort.',
    },
};

let currentQuestion = 0;
let quizAnswers = [];

function renderCategories() {
    const grid = document.querySelector('#categories-grid');
    if (!grid) return;

    grid.innerHTML = categories.map(category => `
        <a class="category-card" href="catalog.html?category=${category.id}">
            <span class="category-icon">${category.icon}</span>
            <h3>${category.title}</h3>
            <p>${category.desc}</p>
        </a>
    `).join('');
}

function renderFeaturedMotorcycles() {
    const grid = document.querySelector('#featured-grid');
    if (!grid) return;

    grid.innerHTML = motorcycles.map(moto => `
        <article class="card">
            <img
                class="card-img"
                src="${moto.img}"
                alt="${moto.name}"
                loading="lazy"
            >
            <div class="card-body">
                <span class="card-badge">${getCategoryTitle(moto.category)}</span>
                <h3 class="card-title">${moto.name}</h3>
                <p class="card-text">${moto.cc}cc | ${moto.price}</p>
                <p class="card-text">${moto.desc}</p>
                <a class="btn btn-outline" href="comparison.html?moto=${moto.id}">Compare</a>
            </div>
        </article>
    `).join('');
}

function getCategoryTitle(categoryId) {
    const category = categories.find(item => item.id === categoryId);
    return category ? category.title : categoryId;
}

function startQuiz() {
    currentQuestion = 0;
    quizAnswers = [];
    document.querySelector('#step-0').classList.remove('active');
    document.querySelector('#quiz-result').classList.remove('active');
    renderQuestion();
}

function renderQuestion() {
    const questionsContainer = document.querySelector('#quiz-questions');
    const question = quizQuestions[currentQuestion];

    questionsContainer.innerHTML = `
        <div class="quiz-step active">
            <p class="quiz-progress">Question ${currentQuestion + 1} of ${quizQuestions.length}</p>
            <h3 class="quiz-question">${question.text}</h3>
            <div class="quiz-options">
                ${question.options.map(option => `
                    <button class="quiz-option" type="button" data-category="${option.category}">
                        ${option.text}
                    </button>
                `).join('')}
            </div>
            <div class="quiz-nav">
                ${currentQuestion > 0 ? '<button class="quiz-back" type="button">Back</button>' : ''}
            </div>
        </div>
    `;

    questionsContainer.querySelectorAll('.quiz-option').forEach(button => {
        button.addEventListener('click', () => {
            quizAnswers[currentQuestion] = button.dataset.category;
            currentQuestion += 1;

            if (currentQuestion < quizQuestions.length) {
                renderQuestion();
            } else {
                showResult();
            }
        });
    });

    const backButton = questionsContainer.querySelector('.quiz-back');
    if (backButton) {
        backButton.addEventListener('click', () => {
            currentQuestion -= 1;
            renderQuestion();
        });
    }
}

function showResult() {
    const resultCategory = getMostSelectedCategory();
    const result = quizResults[resultCategory];

    document.querySelector('#quiz-questions').innerHTML = '';
    document.querySelector('#result-title').textContent = result.title;
    document.querySelector('#result-desc').textContent = result.desc;
    document.querySelector('#result-link').href = `catalog.html?category=${resultCategory}`;
    document.querySelector('#quiz-result').classList.add('active');
}

function getMostSelectedCategory() {
    const totals = {};

    quizAnswers.forEach(category => {
        totals[category] = (totals[category] || 0) + 1;
    });

    return Object.keys(totals).sort((a, b) => totals[b] - totals[a])[0] || 'urban';
}

function setFooterDates() {
    const yearEl = document.querySelector('#year');
    const modifiedEl = document.querySelector('#last-modified');

    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (modifiedEl) modifiedEl.textContent = document.lastModified;
}

document.querySelector('#quiz-start').addEventListener('click', startQuiz);
document.querySelector('#quiz-restart').addEventListener('click', startQuiz);

renderCategories();
renderFeaturedMotorcycles();
setFooterDates();
