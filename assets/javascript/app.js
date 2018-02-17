var panel = $("#quiz-area");
var timeStart = 30;

var myQuestions = [
  {
    question: "What is the dominant grape in Chianti wines?",
    answers: ["Sangiovese", "Dolcetto", "Zinfandel"],
    correctAnswer: "Sangiovese",
    image: "assets/images/sangiovese-grape.jpg"
  },{
    question: "What country is generally acknowledged to be the birthplace of wine?",
    answers: ["France", "Georgia", "Romania"],
    correctAnswer: "Georgia",
    image: "assets/images/georgia.jpg"
  },{
    question: "Rioja is a wine from Spain, but what is Rioja?",
    answers: ["A variety of grape", "A region in northern Spain", "A Spanish word meaning 'King of wines'"],
    correctAnswer: "A region on northern Spain",
    image: "assets/images/rioja.jpg"
  },{
    question: "In Portugal, what is a ‘Quinta’?",
    answers: ["The vintage or year of harvest", "A wine-making estate", "A variety of grape used in vintage port"],
    correctAnswer: "A wine-making estate",
    image: "assets/images/quinta.png"
  },{
    question: "Where is the wine region of Mendoza?",
    answers: ["Argentina", "Chile", "Spain"],
    correctAnswer: "Argentina",
    image: "assets/images/mendoza.jpg"
  },{
    question: "Trichloranisole is more commonly known as what?",
    answers: ["Residual Sugar", "Fruit Acid", "Cork Taint"],
    correctAnswer: "Cork Taint",
    image: "assets/images/cork.gif"
  },{
    question: "What is ‘Cava’?",
    answers: ["The grape used for Spanish sparkling wine", "The French term for a wine cellar", "Sparkling wines made in Spain"],
    correctAnswer: "Sparkling wines made in Spain",
    image: "assets/images/cava.jpg"
  },{
    question: "Which wine is sometimes opened with a sword?",
    answers: ["Vin de sabre", "Champagne", "Port"],
    correctAnswer: "Champagne",
    image: "assets/images/sword.gif"
  },{
    question: "which claims to be the oldest continuously operating winery in the Napa Valley?",
    answers: ["Beringer", "Mondavi", "Gallo"],
    correctAnswer: "Beringer",
    image: "assets/images/beringer.jpg"
  },{
    question: "Fermenting in small oak barrels is common for which variety?",
    answers: ["Riesling", "Chardonnay", "Sauvignon Blanc"],
    correctAnswer: "Chardonnay",
    image: "assets/images/oak-barrel.jpg"
  }];

var timer;

var game = {

  questions: myQuestions,
  currentQuestion: 0,
  counter: timeStart,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    this.counter--;
    $("#counter-number").html(this.counter);
    if (this.counter === 0) {
      console.log("TIME UP");
      this.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(this.countdown.bind(this), 1000);

    panel.html("<h2>" + myQuestions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < myQuestions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='btn answer-button' id='button' data-name='" + myQuestions[this.currentQuestion].answers[i]
      + "'>" + myQuestions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    this.counter = window.timeStart;
    $("#counter-number").html(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function() {

    clearInterval(window.timer);

    $("#counter-number").html(this.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + myQuestions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + myQuestions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === myQuestions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(window.timer);

    panel.html("<h2>All done, here's how you did!</h2>");

    $("#counter-number").html(this.counter);

    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (myQuestions.length - (this.incorrect + this.correct)) + "</h3>");
    panel.append("<br><button class='btn' id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(window.timer);
    if ($(e.target).attr("data-name") === myQuestions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    this.incorrect++;

    clearInterval(window.timer);

    panel.html("<h2>Sorry!</h2>");
    panel.append("<h3>The Correct Answer was: " + myQuestions[this.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + myQuestions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === myQuestions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(window.timer);

    this.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + myQuestions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === myQuestions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = timeStart;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
}; //End Game

// =================CLICK EVENTS ===============

//Start Over
$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

//Start Quiz
$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span></h2>");
  game.loadQuestion.bind(game)();
});
