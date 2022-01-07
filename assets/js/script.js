// 1. ref the start btn within my html file
//   1(a) attach a "click" event to the "start" btn
//   1(b) eventHandler that fires once the btn's clicked
// THEN a timer starts and I am presented with a question
// 2. start a timer and render the first question
//   2(a)
// WHEN I answer a question
// 3.
//  4. present with another question
//    4(a)
// 5. WHEN answer a question incorrectly
//   5(a) if else
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

var questions = [
  {
    questionId: 0,
    questionText: "True or False: JavaScript is a compiled language.",
    questionAnswers: [
      {
        0: "True",
      },
      {
        1: "False",
      },
    ],
    correctAnswer: 1,
  },
  {
    questionId: 1,
    questionText: "Which is not a primitive data type in JavaScript?",
    questionAnswers: [
      {
        0: "Number",
      },
      {
        1: "String",
      },
      {
        2: "Boolean",
      },
      {
        3: "Array",
      },
    ],
    correctAnswer: 3,
  },
  {
    questionId: 2,
    questionText: "What do all HTML documents start with?",
    questionAnswers: [
      {
        0: "Hypertext",
      },
      {
        1: "html",
      },
      {
        2: "<!DOCTYPE html>",
      },
      {
        3: "<html>",
      },
    ],
    correctAnswer: 2,
  },
];

var main = document.querySelector("main");

var score = 0;

var questionNumber = 0;

var timerEl = document.querySelector("#timer");

var timerCount = 5 * questions.length;

var countdown = undefined;

var startQuiz = function (event) {
  main.innerHTML = "";
  timerEl.innerHTML = timerCount;
  countdown = setInterval(() => {
    timerCount--;
    timerEl.innerHTML = timerCount;
    if (timerCount === 0) {
      clearInterval(countdown);
      var timesUpMessage = document.createElement("div");
      timesUpMessage.className = "warning message";
      timesUpMessage.innerHTML = "Time's Up!";
      main.appendChild(timesUpMessage);

      setTimeout(completeQuiz, 3000);
    }
  }, 1000);

  generateQuestion(questions[0]);
};

var generateQuestion = function (questionDataObj) {
  main.innerHTML = "";
  var questionEl = document.createElement("div");
  questionEl.setAttribute("data-question-id", questionDataObj.questionId);
  questionEl.addEventListener("click", checkAnswer);
  main.appendChild(questionEl);

  var questionTextEl = document.createElement("h2");
  questionTextEl.className = "question-text";
  questionTextEl.innerHTML = `${questionDataObj.questionText}`;
  questionEl.appendChild(questionTextEl);

  var choicesListEl = document.createElement("ul");
  choicesListEl.className = "choices-list";
  questionEl.appendChild(choicesListEl);

  for (var i = 0; i < questionDataObj.questionAnswers.length; i++) {
    var choiceEl = document.createElement("li");
    choiceEl.className = "choice";
    choiceEl.innerHTML = Object.values(questionDataObj.questionAnswers[i])[0];
    choiceEl.setAttribute(
      "data-answer-id",
      Object.keys(questionDataObj.questionAnswers[i])[0]
    );
    choiceEl.setAttribute("data-question-id", questionDataObj.questionId);

    choicesListEl.appendChild(choiceEl);
  }
};

var checkAnswer = function (event) {
  if (event.target.dataset.answerId === undefined) {
    return false;
  }
  if (document.querySelector(".message")) {
    return false;
  }
  for (var i = 0; i < questions.length; i++) {
    if (questions[i].questionId === parseInt(event.target.dataset.questionId)) {
      var correctAnswer = questions[i].correctAnswer;
    }
  }
  var feedback = document.createElement("div");

  if (parseInt(event.target.dataset.answerId) === correctAnswer) {
    score++;
    questionNumber++;
    feedback.className = "success message";
    feedback.innerHTML = "Correct!";
  } else {
    questionNumber++;
    feedback.className = "warning message";
    feedback.innerHTML = "Wrong!";
  }

  main.appendChild(feedback);
  setTimeout(() => {
    if (questionNumber === questions.length) {
      completeQuiz();
    } else {
      generateQuestion(questions[questionNumber]);
    }
  }, 2000);
  timerCount += 2;
};

var completeQuiz = function () {
  timerEl.innerHTML = "";
  clearInterval(countdown);
  main.innerHTML = `<h1>Quiz Complete!</h1><h2>Your Score: ${score}</h2>`;

  highScoreSubmitFormEl = document.createElement("form");
  main.appendChild(highScoreSubmitFormEl);

  initialsLabelEl = document.createElement("label");
  initialsLabelEl.htmlFor = "initials";
  initialsLabelEl.innerText = "Your Initials: ";

  initialsTextboxEl = document.createElement("input");
  initialsTextboxEl.type = "text";
  initialsTextboxEl.id = "initials";
  initialsTextboxEl.required = true;

  highScoreSubmitButtonEl = document.createElement("button");
  highScoreSubmitButtonEl.type = "submit";
  highScoreSubmitButtonEl.innerHTML = "Submit";
  highScoreSubmitButtonEl.className = "btn";
  highScoreSubmitButtonEl.addEventListener("click", submitHighScore);

  highScoreSubmitFormEl.appendChild(initialsLabelEl);
  highScoreSubmitFormEl.appendChild(initialsTextboxEl);
  highScoreSubmitFormEl.appendChild(highScoreSubmitButtonEl);
};

var submitHighScore = function (event) {
  event.preventDefault();
  var playerInitials = document.querySelector("#initials").value;
  if (!playerInitials) {
    if (!document.querySelector(".warning")) {
      var warningMessage = document.createElement("div");
      warningMessage.className = "warning message";
      warningMessage.innerHTML =
        "You must enter at least one character for initials.";
      main.appendChild(warningMessage);
      setTimeout(() => {
        main.removeChild(warningMessage);
      }, 8000);
    }
    return false;
  }
  var highScoreObj = {
    playerInitials: playerInitials,
    score: score,
  };

  var highScores = JSON.parse(localStorage.getItem("highScores"));
  if (!highScores) {
    highScores = [];
  }
  highScores.push(highScoreObj);
  localStorage.setItem("highScores", JSON.stringify(highScores));

  location.reload(".");
};

var viewHighScores = function (event) {
  document.querySelector("header").innerHTML = "";
  var goHome = document.createElement("div");
  goHome.className = "link";
  goHome.innerHTML = "Return to Home";
  goHome.addEventListener("click", () => location.reload("."));
  document.querySelector("header").appendChild(goHome);

  main.innerHTML = "";

  var highScores = JSON.parse(localStorage.getItem("highScores"));
  if (!highScores) {
    main.innerHTML = "<h2>Looks like nobody has played yet.</h2>";
  } else {
    scoresTableEl = document.createElement("table");
    main.appendChild(scoresTableEl);
    trHeaderEl = document.createElement("tr");
    scoresTableEl.appendChild(trHeaderEl);

    thIntiailsEl = document.createElement("th");
    thIntiailsEl.innerHTML = "Initials";
    trHeaderEl.appendChild(thIntiailsEl);

    thScoreEl = document.createElement("th");
    thScoreEl.innerHTML = "Score";
    trHeaderEl.appendChild(thScoreEl);

    for (var i = 0; i < highScores.length; i++) {
      trEl = document.createElement("tr");
      scoresTableEl.appendChild(trEl);

      tdInitialsEl = document.createElement("td");
      tdInitialsEl.innerHTML = highScores[i].playerInitials;
      trEl.appendChild(tdInitialsEl);

      tdScoreEl = document.createElement("td");
      tdScoreEl.innerHTML = highScores[i].score;
      trEl.appendChild(tdScoreEl);
    }
  }
};

document.querySelector("#start-quiz-btn").addEventListener("click", startQuiz);
document
  .querySelector("#view-high-scores")
  .addEventListener("click", viewHighScores);
