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
const wordCountSelect = document.getElementById("setting-panel_word-count");

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
const startTest = (wordCount = 25) => {
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
    const targetWord = wordsToType[currentWordIndex]; 
    const wordElements = wordDisplay.children;        
    const currentWordSpan = wordElements[currentWordIndex];
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

const showFinalResults = () => {
    const finalElapsedTime = (Date.now() - startTime) / 1000;
    const Wpm = Math.round((correctCharCount / 5) / (finalElapsedTime / 60));
    const accuracy = totalTypedChars > 0 ? Math.round((correctCharCount / totalTypedChars) * 100) : 0;
    const resultsContainer = document.getElementById("results-container");
    const resultsText = document.getElementById("results");
    results.textContent = `WPM: ${Wpm},  Accuracy: ${accuracy}%`;
    resultsContainer.classList.add("active");
}

document.addEventListener("keydown",(event) => {
    startTimer();

    const displayContainer = document.querySelector(".main-display");
    
    if (event.key === " ") {
    
        if(event.key === " " && currentWordIndex === wordsToType.length - 1 && typedLetter.length >  0){
            showFinalResults();
            return;
        }

        if (typedLetter.trim().length > 0 ) {
            typedLetter = "";
            currentWordIndex++;
            highlightCorrectLetters();
            return;  
        }

        if(typedLetter.trim().length === 0){
           if(event.key === " "){
           event.preventDefault();
           return;
           }
        }
    }

    if (event.key.length === 1) {
        const targetWord = wordsToType[currentWordIndex];
        if (typedLetter.length < targetWord.length) {
            if (event.key === targetWord[typedLetter.length]){
                correctCharCount++;
                displayContainer.classList.add("flash-correct");
                setTimeout(() => displayContainer.classList.remove("flash-correct"), 150);
            }else {
                displayContainer.classList.add("flash-error");
                setTimeout(() => displayContainer.classList.remove("flash-error"), 150);
            }
        }
        typedLetter += event.key;
        totalTypedChars++;
        highlightCorrectLetters();
    }

    if (event.key === "Backspace") {
        if (typedLetter.length > 0) {
            typedLetter = typedLetter.slice(0, -1);
            correctCharCount--;
            totalTypedChars--;
            highlightCorrectLetters();
        }
    }

    if (currentWordIndex === wordsToType.length - 1 && typedLetter.length === wordsToType[currentWordIndex].length) {
        showFinalResults();
        return;
    }
})

document.getElementById("refresh_icone").addEventListener("click",() => {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.classList.remove("active");
    const selectedCount = parseInt(wordCountSelect.value);
    startTest(selectedCount);
})

const getWordCount = () => {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.classList.remove("active");
    const selectedCount = parseInt(wordCountSelect.value);
    startTest(selectedCount);
}

document.querySelector(".nav-href-home").addEventListener("click", () =>  {
    window.location.href = "home.html";
})

wordCountSelect.addEventListener("change",getWordCount);

wordCountSelect.addEventListener("click", getWordCount);

modeSelect.addEventListener("change", () => startTest());

// Start the test
startTest();
