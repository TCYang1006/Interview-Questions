var startBtn = document.querySelector('#start'),
    highBtn = document.querySelector('#high'),
    gbBtn = document.querySelector('#go'),
    clearHSBtn = document.querySelector('#clearHS'),
    submitoBtn = document.querySelector('#submito'),
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
    iScoreSection = document.querySelector('.iScore'),
    scoreDisplayEl = document.querySelector('#scoreDisplay'),
    ansBtn = document.querySelectorAll('button.ansBtn'),
    initEl = document.querySelector('#init'),
    item = document.getElementById("userAnswer"),
    timeIntervalID,
    uAnswer,
    score,
    timeLeft,
    questionIndex,
    scoresArray = [],
    scoreListEl = document.querySelector('#scoreList'),

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

function countdown() {
    timeIntervalID = setInterval(function () {
        if (timeLeft > 0) {
            timerEl.textContent = "Timer: " + timeLeft;
            timeLeft--;
        } else {
            //timer reaches zero sec Need to calculate scores
            timerEl.textContent = "Timer: " + timeLeft;
            clearInterval(timeIntervalID);
            savingInitials()
        }
    }, 1000);
}

function showQuestion() {
    var questionObj;

    if (questionIndex < questionArray.length) {
        questionObj = questionArray[questionIndex];

        showQEl.textContent = questionObj.q;

        answer1El.textContent = questionObj.ansr[0];
        answer1El.dataset.correct = questionObj.ansr[0] === questionObj.ca;
        answer2El.textContent = questionObj.ansr[1];
        answer2El.dataset.correct = questionObj.ansr[1] === questionObj.ca;
        answer3El.textContent = questionObj.ansr[2];
        answer3El.dataset.correct = questionObj.ansr[2] === questionObj.ca;
        answer4El.textContent = questionObj.ansr[3];
        answer4El.dataset.correct = questionObj.ansr[3] === questionObj.ca;

    } else {
        savingInitials();
    }
    answer1El.addEventListener('click', recordingClick);
    answer2El.addEventListener('click', recordingClick);
    answer3El.addEventListener('click', recordingClick);
    answer4El.addEventListener('click', recordingClick);
}



function recordingClick(event) {
    event.target.matches("button");
    uAnswer = event.target.dataset.correct;
    showResults(uAnswer);

}

function showResults(result) {
    if (result === "true") {
        wgOrCorrEl.textContent = "Correct";
        if (questionIndex === questionArray.length - 1) {
            savingInitials()
        } else {
            questionIndex++;
            showQuestion();
        }

    } else {
        wgOrCorrEl.textContent = "Wrong";
        timeLeft = timeLeft - 10;
        if (questionIndex === questionArray.length - 1) {
            savingInitials()
        } else {
            questionIndex++;
            showQuestion();
        }
    }
}

function savingInitials() {
    quizSection.classList.add('hidden');
    iScoreSection.classList.remove('hidden');
    scoreDisplayEl.textContent = "Your final score is " + timeLeft + ".";
    clearInterval(timeIntervalID);

}
function recordInitial() {
    var userInitials = initEl.value,
        finalScore = timeLeft,
        userInitialsAndFinalScoreObj = { name: userInitials, score: finalScore };

    if (localStorage.getItem("saved-scores") === null) {
        scoresArray.push(userInitialsAndFinalScoreObj);
        localStorage.setItem("saved-scores", JSON.stringify(scoresArray));
    } else {
        scoresArray = JSON.parse(localStorage.getItem("saved-scores"));
        scoresArray.push(userInitialsAndFinalScoreObj);
        localStorage.setItem("saved-scores", JSON.stringify(scoresArray));

    }
    renderScores();

    iScoreSection.classList.add('hidden');
    highScoreSection.classList.remove('hidden');

}

function renderScores() {
    var liEl;
    //remove any name and score list
    scoreListEl.innerHTML = '';

    for (var i = 0; i < scoresArray.length; i++) {
        liEl = document.createElement('li');
        liEl.textContent = scoresArray[i].name + " - " + scoresArray[i].score;
        scoreListEl.appendChild(liEl);
    }
}
function clearscore() {
    localStorage.clear();
    scoreListEl.innerHTML = "";
    startWelcome();
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
clearHSBtn.addEventListener('click', clearscore);
submitoBtn.addEventListener('click', recordInitial);