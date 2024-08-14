"use strict";

// Constructor function for questions
function Question(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}

// Sample quiz data
const QuizData = [
    new Question("The 'var' and 'function' are known as _____________", ["Data types", "Keywords", "Declaration statements", "Prototypes"], 2),
    new Question("Which of these is used in JavaScript for calling a method or a function?", ["Invocation Expression", "Functional Expression", "Property Access Expression", "Primary Expression"], 0),
    new Question("Which of these operators are used for checking if a specific property exists?", ["within", "in", "exists", "exist"], 1),
    new Question("Which of these is not a keyword?", ["debugger", "with", "use strict", "if"], 2),
    new Question("Which of these keywords is used to define various functions in JavaScript?", ["main", "init", "Void", "function"], 3)
];

let score = 0;
let cur = 0;

// Predefining the Access elements
const startScreen = document.getElementById("start-screen");
const quizContainer = document.querySelector(".quiz-container");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const progressBar = document.getElementById("progress");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const startButton = document.getElementById("start-button");

// Load a question into the UI
const loadQuestion = () => {
    const question = QuizData[cur];
    questionText.textContent = (cur+1)+". "+question.question;
    answerButtons.innerHTML = "";

    question.answers.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(index));
        answerButtons.appendChild(button);
    });

    updateProgress();
}

// Select an answer
const selectAnswer = (index) => {
    const buttons = answerButtons.getElementsByTagName("button");
    for (let button of buttons) {
        button.classList.remove("selected");
    }
    buttons[index].classList.add("selected");
}

// Update progress bar
const updateProgress = () => {
    const progress = ((cur + 1) / QuizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Check if the selected answer is correct
const checkAnswer = () => {
    const selectedButton = answerButtons.querySelector(".selected");
    if (selectedButton) {
        const selectedAnswer = Array.from(answerButtons.children).indexOf(selectedButton);
        if (selectedAnswer === QuizData[cur].correctAnswer) {
            score++;
        }
    }
}

// Show the result at the end of the quiz
const showResult = () => {
    const buttons = answerButtons.getElementsByTagName("button");
    for (let button of buttons) {
        button.style.display = "none";
    }
    questionText.style.display = "none";
    answerButtons.style.display = "none";
    prevButton.style.display = "none";
    nextButton.style.display = "none";

    const percentage = (score / QuizData.length) * 100;
    scoreElement.textContent = `${score} / ${QuizData.length}`;
    feedbackElement.textContent = percentage > 80 ? "Excellent!" :
        percentage >= 50 ? "Good job!" : "Keep practicing!";
    progressBar.style.display = "block";
    progressBar.style.width = `${percentage}%`;
    if (percentage >= 80) {
        progressBar.style.backgroundColor = "green"; // Excellent
    } else if (percentage >= 50) {
        progressBar.style.backgroundColor = "yellow"; // Good job
    } else {
        progressBar.style.backgroundColor = "red"; // Keep practicing
    }

    scoreContainer.style.display = "block";
}
// Event listeners for navigation buttons
prevButton.addEventListener("click", () => {
    if (cur > 0) {
        checkAnswer();
        cur--;
        loadQuestion();
    }
});

nextButton.addEventListener("click", () => {
    checkAnswer();
    cur++;
    if (cur < QuizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
});
