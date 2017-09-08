//Variables

var userChoice;

var correctAnswers = 0;

var incorrectAnswer = 0;

var questionCount = 0;

var time = 30;

var intervalId;

var isRunning = false;

var myQuestions = [
  {
    question: "What is the dominant grape in Chianti wines?",

    answer1: "Sangiovese", 
    answer2: "Dolcetto", 
    answer3: "Zinfandel",
   
    correctAnswer: "Sangiovese",
  },{
    question: "What country is generally acknowledged to be the birthplace of wine?",

    answer1: "France", 
    answer2: "Georgia", 
    answer3: "Romania",
   
    correctAnswer: "Georgia",
  },{
    question: "Rioja is a wine from Spain, but what is Rioja?",

    answer1: "A variety of grape", 
    answer2: "A region in northern Spain", 
    answer3: "A Spanish word meaning 'King of wines'",
   
    correctAnswer: "A region on northern Spain",
  },{
    question: "In Portugal, what is a ‘Quinta’?",

    answer1: "The vintage or year of harvest", 
    answer2: "A wine-making estate", 
    answer3: "A variety of grape used in vintage port",
   
    correctAnswer: "A wine-making estate",
  },{
    question: "Where is the wine region of Mendoza?",

    answer1: "Argentina", 
    answer2: "Chile", 
    answer3: "Spain",
   
    correctAnswer: "Argentina",
  },{
    question: "Trichloranisole is more commonly known as what?",

    answer1: "Residual Sugar", 
    answer2: "Fruit Acid", 
    answer3: "Cork Taint",
   
    correctAnswer: "Cork Taint",
  }];

//Timer functions
function run() {
  if(!isRunning){
    intervalId = setInterval(decrement, 1000);
    isRunning = true;
    $("#start-page").hide();
  }
    if (isRunning = true){
    $("#quiz").removeClass("quizDisplay");
    }
  
  loadQuestion();
}

function decrement() {
  time--;
  $("#timer").html("Remaining Time: " + time);
    if (time === 0) {
    stop();
    alert("You ran out of time!");
    }
}

function stop() {
  clearInterval(intervalId);
  isRunning = false;
  
  results();
}

//Let's begin!
$("#start").click(run);

function loadQuestion(){
  var question = myQuestions[questionCount++]
  console.log("Answer: " + question.correctAnswer);
  
  $("#question").text(question.question);

  $("#answer1").text(question.answer1);
  $("#answer2").text(question.answer2);
  $("#answer3").text(question.answer3);
}

$("#next").click(function(){
  getAnswer();
    if (questionCount === myQuestions.length){
      stop();
     } else{
        $('input[name="answer"]').prop('checked', false);
        timerReset();
        loadQuestion();
     }
})

function timerReset(){
  time = 31;
}

//Display Results
function results(){
  $("#quiz").addClass("quizDisplay");
  $("#results").removeClass("resultsDisplay");
  $("#correct").text("Correct Answers: " + correctAnswers);
  $("#incorrect").text("Incorrect Answers: " + incorrectAnswer);
}

function getAnswer(){
 if (userChoice = question.correctAnswer){
    correctAnswers++;
    console.log("Correct Answers: " + correctAnswers);
    console.log("Incorrect Answers: " + incorrectAnswer);
 } else {
    incorrectAnswer++;
    console.log("Correct Answers: " + correctAnswers);
    console.log("Incorrect Answers: " + incorrectAnswer);
 }
}



