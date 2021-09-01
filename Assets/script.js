var startBtn = document.getElementById('start'),
    timerEl = document.getElementById('countdown'),
    answersArray = [],
    score = 0,
    //https://www.sitepoint.com/simple-javascript-quiz/
    questionArray = [{
        q: "Commonly used data types DO not include:",
        a: [
            "1.  strings",
            "2.  booleans",
            "3.  alerts",
            "4.  numbers"
    ], ca: "2"
    }, {
        q: "The condition in an if/else statement is enclosed with a __________.",
        a: [
            "1.  quotes",
            "2.  curly brackets",
            "3.  parenthesis",
            "4.  square brackets"
        ], ca: "3"
    }, {
        q: "String values must be enclosed within _________ when being assigned to variables.",
        a: [
            "1.  commas",
            "2.  curly brackets",
            "3.  quotes",
            "4.  paranthesis"
        ], ca: "2"
    }];

//timer count down from 75 secs (shown in example - currently set to 5 secs)****NEED TO CHANGE TO 75 BEFORE SUBMITTING
function countdown() {
    var timeLeft = 5;

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


startBtn.onclick = countdown;