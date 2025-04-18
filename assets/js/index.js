/**
 * Point culture (en Français car je suis un peu obligé): 
 * Dans ce genre de jeu, un mot equivaut a 5 caractères, y compris les espaces. 
 * La precision, c'est le pourcentage de caractères tapées correctement sur toutes les caractères tapées.
 * 
 * Sur ce... Amusez-vous bien ! 
 */
let startTime = null, endTime = null ,correctCharCount = 0,totalTypedChars = 0;
let currentWordIndex = 0;
let typedLetter = "";
const wordsToType = [];

const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("main-word-display");
const results = document.getElementById("results");

const words = {
    easy: ["apple", "banana", "grape", "orange", "cherry"],
    medium: ["keyboard", "monitor", "printer", "charger", "battery"],
    hard: ["synchronize", "complicated", "development", "extravagant", "misconception"]
};

// Generate a random word from the selected mode
const getRandomWord = (mode) => {
    const wordList = words[mode];
    return wordList[Math.floor(Math.random() * wordList.length)];
};

// Initialize the typing test
const startTest = (wordCount = 50) => {
    wordsToType.length = 0; // Clear previous words
    wordDisplay.innerHTML = ""; // Clear display
    currentWordIndex = 0;
    typedLetter = "";
    startTime = null;
    correctCharCount = 0;
    totalTypedChars = 0;

    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord(modeSelect.value));
    }

    wordsToType.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        wordDisplay.appendChild(span);
    });
    results.textContent = "";
};

// Start the timer when user begins typing
const startTimer = () => {
    if (!startTime) startTime = Date.now();
};

const highlightCorrectLetters = () => {
    const targetWord = wordsToType[currentWordIndex]; // Le mot à taper
    const wordElements = wordDisplay.children;        // Tous les mots affichés
    const currentWordSpan = wordElements[currentWordIndex]; // Le <span> du mot courant
    let letterSpan = "";
    let opacityStyle =  "opacity: 1;";
   
    for(let i = 0;i < targetWord.length;i++){
        if(i < typedLetter.length){
            if(typedLetter[i] === targetWord[i]){
                letterSpan += `<span style="${opacityStyle}">${targetWord[i]}</span>`

            }else{
                letterSpan +=  `<span style="color: red;${opacityStyle}">${targetWord[i]}</span>`
            }
        }else {
            letterSpan += `<span style="color: #AAAAAA;">${targetWord[i]}</span>`;
        }
    }
    letterSpan += `<span> </span>`;
    currentWordSpan.style.opacity = "1";
    currentWordSpan.innerHTML = letterSpan;

    currentWordSpan.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center"
    });
    
};

// Event listeners
// Attach `updateWord` to `keydown` instead of `input`
inputField.addEventListener("keydown", (event) => {
    startTimer();
    updateWord(event);
});
modeSelect.addEventListener("change", () => startTest());

// Start the test
startTest();
