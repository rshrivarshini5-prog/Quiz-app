// quiz.js

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");
const restartBtn = document.getElementById("restart-btn");
const timerEl = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 60; // seconds

function startTimer() {
  timeLeft = 60;
  timerEl.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showResult();
    }
  }, 1000);
}

function showQuestion() {
  resetState();
  let q = quizQuestions[currentQuestionIndex];
  questionEl.textContent = q.question;

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => selectOption(btn, q.answer));
    optionsEl.appendChild(btn);
  });
}

function resetState() {
  nextBtn.classList.add("hidden");
  while (optionsEl.firstChild) {
    optionsEl.removeChild(optionsEl.firstChild);
  }
}

function selectOption(btn, correctAnswer) {
  clearInterval(timerInterval); // stop timer for that question
  const userChoice = btn.textContent;
  const allBtns = optionsEl.querySelectorAll("button");

  allBtns.forEach(b => {
    if (b.textContent === correctAnswer) {
      b.classList.add("correct");
    } else {
      b.classList.add("wrong");
    }
    b.disabled = true;
  });

  if (userChoice === correctAnswer) {
    score++;
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
    startTimer();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.parentElement.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = score;
  totalEl.textContent = quizQuestions.length;
}

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  questionEl.parentElement.classList.remove("hidden");
  resultBox.classList.add("hidden");
  showQuestion();
  startTimer();
});

// Initialize quiz
window.addEventListener("DOMContentLoaded", () => {
  showQuestion();
  startTimer();
});