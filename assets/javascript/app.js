//Variables

var userChoice;

var correctAnswer = 0;

var incorrectAnswer = 0;

var questionCount = 0;

var time = 10;

var intervalId;

var isRunning = false;

var myQuestions = [
  {
    question: "What is the dominant grape in Chianti wines?",

    answers: ["Sangiovese", "Dolcetto", "Zinfandel"],
   
    correctAnswer: "Sangiovese"
 
  },
   {
    question: "What is the dominant grape in Chianti wines?",

    answers: ["Sangiovese", "Dolcetto", "Zinfandel"],
   
    correctAnswer: "Sangiovese"
 
  },
   {
    question: "What is the dominant grape in Chianti wines?",

    answers: ["Sangiovese", "Dolcetto", "Zinfandel"],
   
    correctAnswer: "Sangiovese"
 
  }];


//Timer functions
function run() {
  if(!isRunning){
    intervalId = setInterval(decrement, 1000);
    isRunning = true;
    $("#start").hide();

  }
  if (isRunning = true){
  $("#quiz").removeClass("display");
  }
}

function decrement() {
  time--;
  $("#timer").html("Remaining Time: " + time);
    if (time === 0) {
      stop();
      console.log("Time Up!");
    }
}

function stop() {
  clearInterval(intervalId);
  isRunning = false;
}

//Show results function
function results(){
  $("#submit").click();
}

//Let's begin!
function quizBegin(){
  $("#start").click(run);
  console.log(myQuestions[questionCount].answers);
  shuffleAnswers(myQuestions[questionCount].answers);
  console.log(myQuestions[questionCount].answers);
  $('#quiz').append(myQuestions[questionCount].question);
  for (var i = 0; i < myQuestions[questionCount].answers.length; i++) {
    var b = $('<button class="btn pill">');
    b.text(myQuestions[questionCount].answers[i]);
    b.appendTo('#button'+i);
  }
  checkAnswer();
}

function nextQuestion() {
  time = 10;
  $('#timer').html(run);
  quizBegin();
}

function checkAnswer() {
  $("#button").on("click", function() {

    if ($(this).text() == myQuestions[questionCount].correctAnswer) {
      $('#result').html('That was the correct answer');
      correctAnswer++;
      reset();
    } 
    else {
      $('#result').html('That answer was incorrect the correct answer is ' + myQuestions[questionCount].correctAnswer);
      incorrectAnswer++;
      reset();
    }
  });
  console.log("Question Count: " + questionCount);
  checkFinalAnswer();
}

function shuffleAnswers(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function empty() {
  for (var i = 0; i < 4; i++) {
    $('#button'+i).empty();
  }
  $('#question').empty();
  $('#result').empty();
}

function checkFinalAnswer() {
  if (questionCount === myQuestions.length -1){
    displayResults();
  }
}

  function reset() {
  questionCount++;
  clearInterval(timer);
  setTimeout(empty, 3000);
  setTimeout(nextQuestion, 3000);
}



//https://github.com/nateodes/triviaGame/blob/master/assets/app.js

quizBegin();
