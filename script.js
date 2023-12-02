const startScreen = document.querySelector('.start-screen');
const gameContainer = document.querySelector('.game-container');
const startGameButton = document.getElementById('start-game');
const player = document.getElementById('player');
const raven = document.querySelector('.raven');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const submitButton = document.getElementById('submit-answer');
const endGameContainer = document.getElementById('end-game-container');
const endGameText = document.getElementById('end-game-text');
const playAgainButton = document.getElementById('play-again');

let playerPosition = { x: 50, y: 50 };
let blockedPaths = 0;
let currentQuestionIndex = 0;

startGameButton.addEventListener('click', startGame);

function startGame() {
  startScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  displayQuestion();

  window.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
  const keyPressed = event.key.toLowerCase();

  switch (keyPressed) {
    case 'w':
      movePlayer('up');
      break;
    case 'a':
      movePlayer('left');
      break;
    case 's':
      movePlayer('down');
      break;
    case 'd':
      movePlayer('right');
      break;
    default:
      break;
  }
}

function movePlayer(direction) {
  const stepSize = 50;

  switch (direction) {
    case 'up':
      playerPosition.y = Math.max(playerPosition.y - stepSize, 0);
      break;
    case 'left':
      playerPosition.x = Math.max(playerPosition.x - stepSize, 0);
      break;
    case 'down':
      playerPosition.y = Math.min(playerPosition.y + stepSize, window.innerHeight - 50);
      break;
    case 'right':
      playerPosition.x = Math.min(playerPosition.x + stepSize, window.innerWidth - 50);
      break;
    default:
      break;
  }

  updatePlayerPosition();
}

function updatePlayerPosition() {
  player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
}

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.text;

  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(option, currentQuestion.correctAnswer));
    optionsContainer.appendChild(button);
  });

  questionContainer.classList.remove('hidden');
}

function checkAnswer(selectedAnswer, correctAnswer) {
  if (Array.isArray(correctAnswer)) {
    if (correctAnswer.includes(selectedAnswer)) {
      unblockPath();
    } else {
      handleWrongAnswer();
    }
  } else {
    if (selectedAnswer === correctAnswer) {
      unblockPath();
    } else {
      handleWrongAnswer();
    }
  }
}

function unblockPath() {
  playerPosition.x += 50;
  updatePlayerPosition();
  questionContainer.classList.add('hidden');
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    setTimeout(() => {
      displayQuestion();
    }, 500);
  } else {
    endGame(true);
  }
}

function handleWrongAnswer() {
  blockedPaths++;

  if (blockedPaths >= 3) {
    endGame(false);
  }
}

function endGame(success) {
  if (success) {
    endGameText.textContent = "Congratulations! You are now warm and safe!";
  } else {
    endGameText.textContent = "You froze to death outside.";
  }

  endGameContainer.classList.remove('hidden');
  playAgainButton.addEventListener('click', resetGame);
}

function resetGame() {
  playerPosition = { x: 50, y: 50 };
  blockedPaths = 0;
  currentQuestionIndex = 0;
  updatePlayerPosition();
  questionContainer.classList.add('hidden');
  endGameContainer.classList.add('hidden');
  startScreen.classList.remove('hidden');
}

const questions = [
  {
    text: "What does the ARISE Building stand for?",
    options: ["The Advance Research in Science/Engineering", "The Advanced Research and Innovation in Smart Environments", "The Arts, Reading, Indigenous, Speaking, and English Studies"],
    correctAnswer: "The Advanced Research and Innovation in Smart Environments"
  },
  {
    text: "What programs call the Loeb Building home? (select all that apply)",
    options: ["Anthropology", "Music", "Public Affairs", "English", "Psychology"],
    correctAnswer: ["Music", "Public Affairs"]
  },
  {
    text: "Who is Southam Hall named after?",
    options: ["John D. Southam", "Henry P. Southam", "Harry S. Southam", "George H. Southam"],
    correctAnswer: "Harry S. Southam"
  },
  {
    text: "How many floors does Dunton Tower have?",
    options: ["24", "21", "22", "27"],
    correctAnswer: "22"
  },
  {
    text: "What floor is the quiet study space at MacOdrum Library?",
    options: ["4", "5", "3"],
    correctAnswer: "3"
  },
  {
    text: "Which is older: The Tory Building or the Nideyinan (UC)?",
    options: ["Tory", "Nideyinan"],
    correctAnswer: "Tory"
  },
  {
    text: "The Architecture Program started at what year?",
    options: ["1974", "1972", "1968"],
    correctAnswer: "1968"
  },
  {
    text: "The Nicol Building is home to which program?",
    options: ["The Azrieli School of Architecture and Urbanism", "The Sprott School of Business", "The Nicol School of Arts and Administration"],
    correctAnswer: "The Sprott School of Business"
  },
  {
    text: "What is the name of Carleton's Sports team?",
    options: ["The Gee-Gees", "The Pandas", "The Cardinals", "The Ravens"],
    correctAnswer: "The Ravens"
  },
  {
    text: "What is the name of the Lecture Theatre at the Minto CASE?",
    options: ["Minto Theatre", "Bell Canada Theatre", "Mattamy Theatre"],
    correctAnswer: "Bell Canada Theatre"
  },
  {
    text: "What are Stormot, Dundas, Glengarry, Lanark, Frontenac, Prescott, Russel, and Renfrew named after?",
    options: ["Scottish Hats", "Various cities in Scotland", "The counties and areas around Ottawa", "Different British Dudes"],
    correctAnswer: "The counties and areas around Ottawa"
  },
  {
    text: "What does St. Patrick's Building house? (Select all that Apply)",
    options: ["Carleton University Art Gallery", "Art and Culture", "Linguistics", "Architecture History", "Religion Studies"],
    correctAnswer: ["Carleton University Art Gallery", "Art and Culture", "Religion Studies"]
  }
];
