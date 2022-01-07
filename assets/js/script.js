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
      questionText: "What do all HTML documents start with?"
      questionAnswers: [
        {
          0: "Hypertext",
        },
        {
          1: "html",
        },
        {
          2: "<!DOCTYPE html",
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

var timeCount = 5 * questions.length;

var countdown = undefined;


var startQuiz = function (event) {
    main.innerHTML = "";
    timerEl.innerHTML = timerCount;
    countdown = setInterval(() => {
        timerCount--;
        timerEl.innerHTML = timeCount;
        if (timerCount === 0) {
            clearInterval(countdown);
            var timesUpMessage = document.createElement("div");
            timesUpMessage.className = "warning message";
            timesUpMessage.innerHTML = "Time is up!";
            main.appendChild(timesUpMessage);

            setTimeout(completeQuiz, 3000);
        }
    }, 1000);

    generateQuestion(questions[0]);
};

document.querySelector("#start-quiz-btn").addEventListener("click", startQuiz);
document.querySelector("#view-high-scores").addEventListener("click", viewHighScores);