const text = document.getElementById("text");
const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let timeLeft = 60;
let timer = null;
let started = false;

startBtn.addEventListener("click", startTest);
resetBtn.addEventListener("click", resetTest);

function startTest() {
    if (started) return;

    started = true;
    input.disabled = false;
    input.focus();

    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        calculateResults();

        if (timeLeft <= 0) {
            clearInterval(timer);
            input.disabled = true;
            started = false;
            calculateResults();
            alert("Time's up! Test completed.");
        }
    }, 1000);
}

input.addEventListener("input", calculateResults);

function calculateResults() {
    const typedText = input.value;
    const originalText = text.textContent.trim();

    // Calculate correct characters
    let correctCharacters = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === originalText[i]) {
            correctCharacters++;
        }
    }

    // Calculate accuracy
    let accuracy = 0;

    if (typedText.length > 0) {
        accuracy = Math.round(
            (correctCharacters / typedText.length) * 100
        );
    }

    // Calculate words typed
    const wordsTyped = typedText.trim().length / 5;

    // Calculate time used
    const timeUsed = 60 - timeLeft;

    let wpm = 0;

    if (timeUsed > 0) {
        wpm = Math.round((wordsTyped / timeUsed) * 60);
    }

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
}

function resetTest() {
    clearInterval(timer);

    timeLeft = 60;
    started = false;

    timeDisplay.textContent = 60;
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = 0;

    input.value = "";
    input.disabled = false;
}