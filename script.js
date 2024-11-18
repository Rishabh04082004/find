const wordsToFind = [
    { word: "HELLO", hint: "A common greeting" },
    { word: "WORLD", hint: "The Earth or the realm of human existence" },
    { word: "JAVASCRIPT", hint: "A popular programming language" },
    { word: "GAME", hint: "An activity one engages in for amusement" },
    { word: "CODE", hint: "Instructions for a computer" }
];
const gridSize = 10;
const gridElement = document.getElementById('grid');
const wordListElement = document.getElementById('words');
const hintListElement = document.getElementById('hints');

// Create the grid
const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));

function fillGrid() {
    // Fill the grid with random letters
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (!grid[i][j]) {
                grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }

    // Render the grid in the DOM
    gridElement.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = grid[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;
            gridElement.appendChild(cell);
        }
    }
}

function placeWords() {
    wordsToFind.forEach(({ word }) => {
        let placed = false;
        while (!placed) {
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * (gridSize - word.length));
            let fits = true;

            for (let i = 0; i < word.length; i++) {
                if (grid[row][col + i] !== '') {
                    fits = false;
                    break;
                }
            }

            if (fits) {
                for (let i = 0; i < word.length; i++) {
                    grid[row][col + i] = word[i];
                }
                placed = true;
            }
        }
    });
}

function init() {
    placeWords();
    fillGrid();

    // Add words to find and their hints to the page
    wordsToFind.forEach(({ word, hint }) => {
        const liWord = document.createElement('li');
        liWord.textContent = word;
        wordListElement.appendChild(liWord);

        const liHint = document.createElement('li');
        liHint.textContent = `${word}: ${hint}`;
        hintListElement.appendChild(liHint);
    });
}

// Start the game
init();
