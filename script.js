const quotes = [
    {
        text: "The important thing is to never stop questioning.",
        author: "Albert Einstein",
        category: "science"
    },
    {
        text: "Science is the systematic classification of experience.",
        author: "George Henry Lewes",
        category: "science"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
        category: "motivation"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "motivation"
    },
    {
        text: "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        author: "Unknown",
        category: "humor"
    },
    {
        text: "I'm reading a book on anti-gravity. It's impossible to put down.",
        author: "Anonymous",
        category: "humor"
    }
];

let currentIndex = 0;
let filteredQuotes = [...quotes];
const categorySelect = document.getElementById('category');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Initialize from localStorage
const savedDarkMode = localStorage.getItem('darkMode') === 'true';
const savedFontSize = localStorage.getItem('fontSize') || '24';

darkModeToggle.checked = savedDarkMode;
if (savedDarkMode) body.classList.add('dark-mode');
quoteText.style.fontSize = `${savedFontSize}px`;

function filterQuotes(category) {
    filteredQuotes = category === 'all' 
        ? [...quotes] 
        : quotes.filter(quote => quote.category === category);
    
    currentIndex = 0;
    displayQuote();
}

function displayQuote() {
    if (!filteredQuotes.length) {
        quoteText.textContent = "No quotes available in this category.";
        quoteAuthor.textContent = "";
        return;
    }
    const currentQuote = filteredQuotes[currentIndex];
    quoteText.textContent = currentQuote.text;
    quoteAuthor.textContent = `- ${currentQuote.author}`;
}

function nextQuote() {
    if (!filteredQuotes.length) return;
    currentIndex = (currentIndex + 1) % filteredQuotes.length;
    displayQuote();
}

function prevQuote() {
    if (!filteredQuotes.length) return;
    currentIndex = (currentIndex - 1 + filteredQuotes.length) % filteredQuotes.length;
    displayQuote();
}

function randomQuote() {
    if (!filteredQuotes.length) return;
    currentIndex = Math.floor(Math.random() * filteredQuotes.length);
    displayQuote();
}

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

function adjustFontSize(direction) {
    const currentSize = parseInt(quoteText.style.fontSize);
    let newSize = direction === 'increase' ? currentSize + 2 : currentSize - 2;
    newSize = Math.max(16, Math.min(32, newSize));
    quoteText.style.fontSize = `${newSize}px`;
    localStorage.setItem('fontSize', newSize);
}

// Event Listeners
categorySelect.addEventListener('change', (e) => filterQuotes(e.target.value));
document.getElementById('nextBtn').addEventListener('click', nextQuote);
document.getElementById('prevBtn').addEventListener('click', prevQuote);
document.getElementById('randomBtn').addEventListener('click', randomQuote);
darkModeToggle.addEventListener('change', toggleDarkMode);
document.getElementById('increaseFont').addEventListener('click', () => adjustFontSize('increase'));
document.getElementById('decreaseFont').addEventListener('click', () => adjustFontSize('decrease'));

// Initial display
filterQuotes('all');