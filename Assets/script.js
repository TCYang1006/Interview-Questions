var startBtn = document.querySelector('#start'),
    highBtn = document.querySelector('#high'),
    gbBtn = document.querySelector('#go'),
    timerEl = document.querySelector('#countdown'),
    welcomeSection = document.querySelector('.welcome'),
    quizSection = document.querySelector('.quiz'),
    showQEl = document.querySelector('#showQ'),
    answer1El = document.querySelector('#answer1'),
    answer2El = document.querySelector('#answer2'),
    answer3El = document.querySelector('#answer3'),
    answer4El = document.querySelector('#answer4'),
    wgOrCorrEl = document.querySelector('#wgOrCorr'),
    highScoreSection = document.querySelector('.highScore'),
    ansBtn = document.querySelectorAll('button.ansBtn'),
    item = document.getElementById("userAnswer"),
    uAnswer,
    answersArray = [],
    score,
    timeLeft,
    questionIndex,

    questionArray = [{
        q: "Commonly used data types DO not include:",
        ansr: [
            "1.  strings",
            "2.  booleans",
            "3.  alerts",
            "4.  numbers"
        ],
        ca: "3.  alerts"
    }, {
        q: "The condition in an if/else statement is enclosed with a __________.",
        ansr: [
            "1.  quotes",
            "2.  curly brackets",
            "3.  parenthesis",
            "4.  square brackets"
        ],
        ca: "3.  parenthesis"
    }, {
        q: "String values must be enclosed within _________ when being assigned to variables.",
        ansr: [
            "1.  commas",
            "2.  curly brackets",
            "3.  quotes",
            "4.  paranthesis"
        ],
        ca: "3.  quotes"
    }, {
        q: "Arrays in JavaScript can be used to store _________.",
        ansr: [
            "1.  numbers and string",
            "2.  other arrays",
            "3.  booleans",
            "4.  all of the above"
        ],
        ca: "4.  all of the above"
    }, {
        q: "A very useful tool used during development and debugging for printing content to the debugger is:",
        ansr: [
            "1.  JavaScript",
            "2.  terminal/bash",
            "3.  for loops",
            "4.  console.log"
        ],
        ca: "4.  console.log"
    }];

//timer count down from 75 secs (shown in example - currently set to 5 secs)****NEED TO CHANGE TO 75 BEFORE SUBMITTING
function countdown() {
    timeLeft = 20;

    var timeIntervalID = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = "Timer: " + timeLeft;
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = "Timer: " + timeLeft;
            timeLeft--;
        } else {
            //timer reaches zero sec Need to calculate scores
            timerEl.textContent = "Timer: " + timeLeft;
            clearInterval(timeIntervalID);
        }
    }, 1000);
}

function showQuestion() {
    //check if questionIndex is equal to the size of the question array
    //if they are equal the quiz is over and prompt user to save inital and score(defind new function for saving inital and score)
    if (questionIndex < questionArray.length) {
        console.log(questionIndex);
    } savingInitials();



    //get next question object from question array using question index
    if (questionIndex < questionArray.length) {
        //shows questions
        showQEl.textContent = questionArray[questionIndex].q;
        console.log(showQEl.textContent);
        //shows answer
        answer1El.textContent = questionArray[questionIndex].ansr[0];
        console.log(answer1El.textContent);
        answer2El.textContent = questionArray[questionIndex].ansr[1];
        console.log(answer2El.textContent);
        answer3El.textContent = questionArray[questionIndex].ansr[2];
        console.log(answer3El.textContent);
        answer4El.textContent = questionArray[questionIndex].ansr[3];
        console.log(answer4El.textContent);
    }
    //declare local variable question called question and assign 'q' value of the question object to it
    // var question;
    // question = questionArray[questionIndex].q;
    // console.log(question);
    //using a for loop go through the 'a' array and then assign the element of the array to the list of answer using the 'id'
    /*for (let i = 0; i < questionArray.length; i++) {
        answer1El.textContent = questionArray[questionIndex].ansr[0];
        console.log(answer1El.textContent);
        answer2El.textContent = questionArray[questionIndex].ansr[1];
        console.log(answer2El.textContent);
        answer3El.textContent = questionArray[questionIndex].ansr[2];
        console.log(answer3El.textContent);
        answer4El.textContent = questionArray[questionIndex].ansr[3];
        console.log(answer4El.textContent);
    }*/

    //TODO:  for each list item assign an click event listner that checks for the correct answer (call checkAnswers)
    answer1El.addEventListener('click', recordingClick);
    answer2El.addEventListener('click', recordingClick);
    answer3El.addEventListener('click', recordingClick);
    answer4El.addEventListener('click', recordingClick);

    //add one to the question index
    //questionIndex++;

}



function recordingClick(event) {
    if (event.target.matches("button")) {
        uAnswer = event.target.textContent;
        if (questionIndex === questionArray.length - 1) {
            checkAnswer(uAnswer);
            //end quiz
        } else {
            checkAnswer(uAnswer);
        }
    }
}

function checkAnswer(uAnswer) {
    if (uAnswer === questionArray[questionIndex].ca) {
        result = true;
        showResults(result);
    } else {
        result = false;
        timeLeft = timeLeft - 10;
        showResults(result);
    }
}

function showResults(result) {
    if (result === true) {
        wgOrCorrEl.textContent = "Correct";
        questionIndex++;
        showQuestion();
    } else {
        wgOrCorrEl.textContent = "Wrong";
        questionIndex++;
        showQuestion();
    }
}

function savingInitials() {

}

function startQuiz() {
    //set current score to zero
    score = 0;
    //set time left 75
    timeLeft = 75;
    //set question index to zero
    questionIndex = 0;
    //hide welcome section
    welcomeSection.classList.add('hidden');
    //display quiz section
    quizSection.classList.remove('hidden');
    //start timer
    countdown();
    //show question
    showQuestion();
}

function startHighScore() {
    //hide welcome section
    welcomeSection.classList.add('hidden');
    //display high score section
    highScoreSection.classList.remove('hidden');

}

function startWelcome() {
    //display welcome section
    welcomeSection.classList.remove('hidden');
    //hide high score section
    highScoreSection.classList.add('hidden');
}

startBtn.addEventListener('click', startQuiz);
highBtn.addEventListener('click', startHighScore);
gbBtn.addEventListener('click', startWelcome);