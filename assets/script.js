// Start page is loaded at top 
// Define start quiz button
var startBtn = document.querySelector("#start");
// Define elements
var container = document.querySelector(".container");
var h1 = document.querySelector("h1")
// Load sounds
var successAudio = new Audio('assets/success.mp3');
var failureAudio = new Audio('assets/failure.mp3');

// Create invisible elements to display "Correct!" or "Incorrect"
var container2 = document.createElement("div");
container2.setAttribute("class", "container");
document.body.appendChild(container2);
var hr = document.createElement("hr");
hr.setAttribute("style", "display: none;");
container2.appendChild(hr);
var correct = document.createElement("p");
correct.setAttribute("class", "textCenter")
correct.setAttribute("id", "correct");
container2.appendChild(correct);


// instatiate question array
var questionArray = [{question: "Commonly used datatypes do NOT include:", "button1": ["1. strings", false], "button2": ["2. booleans", false], "button3": ["3. alerts", true], "button4": ["4. numbers", false]}, 
                     {question: "The condition of an if / else statement is enclosed within ______.", "button1": ["1. quotes", false], "button2": ["2. curly brackets", false], "button3": ["3. parentheses", true], "button4": ["4. square brackets", false]}, 
                     {question: "Arrays in Javascript can be used to store _______.", "button1": ["1. numbers", false], "button2": ["2. arrays", false], "button3": ["3. booleans", false], "button4": ["4. All of the above", true]},
                     {question: "String values are enclosed within ____ when being assigned to variables", "button1": ["1. double quotes", false], "button2": ["2. single quotes", false], "button3": ["3. back ticks", false], "button4": ["4. Any of the above", true]},
                     {question: "JavaScript is generally written within an IDE. What does IDE stand for?", "button1": ["1. Independent Development Enviroment", false], "button2": ["2. Integrated Development Environment", true], "button3": ["3. Instant Developer Enclosure", false], "button4": ["4. Intentional Destiny Explorer", false]}
]

// Function run by startBtn click
function startQuiz() {
    // remove start page
    document.querySelector("p").remove();
    document.querySelector("#start").remove();
    
    // Uncenter elements within container
    container.setAttribute("class", "container");
    
    // create four buttons 
    var button1 = document.createElement("button");
    button1.setAttribute("class", "btn block");
    button1.setAttribute("id", "button1");
    container.appendChild(button1);
    button1.addEventListener("click", evalAnswer)

    
    var button2 = document.createElement("button");
    button2.setAttribute("class", "btn block");
    button2.setAttribute("id", "button2");
    container.appendChild(button2);
    button2.addEventListener("click", evalAnswer)

    
    var button3 = document.createElement("button");
    button3.setAttribute("class", "btn block");
    button3.setAttribute("id", "button3");
    container.appendChild(button3);
    button3.addEventListener("click", evalAnswer)

    
    var button4 = document.createElement("button");
    button4.setAttribute("class", "btn block");
    button4.setAttribute("id", "button4");
    container.appendChild(button4);
    button4.addEventListener("click", evalAnswer);

    // Call loadNext() to load questions.
    h1.setAttribute("id", "question");
    loadNext();
    // start timer
    quizTimer("start");
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

var seconds = 60;
var timerRunning = true;
function quizTimer() {
        // Create display of timer
        var timerElement = document.createElement("p");
        timerElement.setAttribute("style", "text-align: end; height: 2rem; margin: 0; padding; 0;");
        h1.setAttribute("style", "margin-top: 8rem");
        timerElement.textContent = `Time: ${seconds}`;
        document.body.prepend(timerElement);
        // Set timer with setInterval()
        var timer = setInterval(() => {
            if (timerRunning) {
                if (seconds > 1) {
                    seconds--;
                    timerElement.textContent = `Time: ${seconds}`;
                } else {
                    // Clear page
                    removeChildren(document.body);
                    // Display FAILED page
                    var failed = document.createElement("p");
                    failed.setAttribute("style", "font-size: 100px; color: red; text-align: center;")
                    failed.innerHTML = "FAILED!<br>";
                    document.body.appendChild(failed);
                    // Try again button
                    var tryAgain = document.createElement("button");
                    tryAgain.setAttribute("class", "btn");
                    tryAgain.setAttribute("onClick", "window.location.reload();");
                    tryAgain.textContent = "Try Again";
                    failed.appendChild(tryAgain);
                    clearInterval(timer);
                }
            } else {
                clearInterval(timer);
            }
        }, 1000);
}     

var questionIndex = 0;

function loadNext() {
    // If user just answered final question:
    if (questionIndex >= questionArray.length) {
        loadDone();
    } else {
    // Load in values for question header and 4 buttons. Use an array of objects. Object.keys(object) will give the keys
    var content = questionArray[questionIndex];
    h1.textContent = content.question;
    for (i=1; i<5; i++) {
        document.querySelector(`#button${i}`).textContent = content[`button${i}`][0];
    }
    // On any button press call evalAnswer()
    }
}

function evalAnswer(event) {
    // get value of button from event
    event.target.blur();
    var buttonId = event.target.id;
    // Check if button clicked is the correct answer
    if (questionArray[questionIndex][buttonId][1]) {
        // play sound
        successAudio.play();
        // set text to display below buttons
        correct.textContent = "Correct!";
    } else {
        // play sound
        failureAudio.play();
        // set text to display below buttons
        correct.textContent = "Incorrect!";
        // subtract 10 seconds
        seconds -= 10;
    }
    // Show hr
    hr.setAttribute("style", "display: block;");
    // Hide elements after 1 second
    setTimeout(() => {
        hr.setAttribute("style", "display: none;");
        correct.textContent = "";
    }, 1000);
    questionIndex++;
    // call loadNext
    loadNext()
}

// newHighScore will be set to true below if the new score is a high score
var newHighScore = false;

function loadDone() {
    timerRunning = false;
    document.querySelector("p").textContent = `Time: ${seconds}`;
    // Clear page of elements inside container
    var buttons = document.querySelectorAll(".btn");
    for (i=0; i<buttons.length; i++) {
        buttons[i].remove();
    }
    // Add header "All done!"
    h1.textContent = "All done!";
    // Change text content of <p>
    var p = document.createElement("p");
    p.textContent = `Your final score is ${seconds}!`;
    container.appendChild(p);
    // Create form
    var form = document.createElement("form");
    container.appendChild(form);
    // Add initals input field
    var initials = document.createElement("input");
    initials.setAttribute("type", "text");
    initials.setAttribute("placeholder", "Enter your initials");
    form.appendChild(initials);
    // Add submit Button
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "btn");
    submitBtn.textContent = "Submit";
    form.appendChild(submitBtn);
    // Add event listener
    submitBtn.addEventListener("click", function(event) {
        // prevent page refresh
        event.preventDefault();
        // deselect button
        event.target.blur();
        submitHighScore(initials);
    })
}

function submitHighScore(initials) {
    // If no initials entered, go no further
    if (!initials.value) {
        correct.textContent = "Please enter your initials";
        // Show hr
        hr.setAttribute("style", "display: block;");
        // Hide elements after 1 second
        setTimeout(() => {
            hr.setAttribute("style", "display: none;");
            correct.textContent = "";
        }, 1000);
        return;
    }
    // Store  persistantly;
    var HighScore = [initials.value, seconds];
    var storedHighScores = localStorage.getItem("HighScores");
    // If there was anything in local storage:
    if (storedHighScores) {
        storedHighScores = JSON.parse(storedHighScores);
        // Place the score storedHighScores is ordered high to low
        // If there are multiple high scores already stored
        if (storedHighScores.length > 1) {
            for (i=0; i<(storedHighScores.length-1); i++) {
                if (seconds >= storedHighScores[0][1]) {
                    storedHighScores.unshift(HighScore);
                    newHighScore = true;
                    break;
                } else if ((seconds <= storedHighScores[i][1]) && (seconds >= storedHighScores[i+1][1])) {
                    storedHighScores.splice((i+1), 0, HighScore);
                    break;
                } else if (i == (storedHighScores.length - 2)) {
                    storedHighScores.push(HighScore);
                    break;
                }
            }
        // If there is only one stored    
        } else { 
            console.log("length == 1")
            if (seconds >= storedHighScores[0][1]) {
                storedHighScores.unshift(HighScore);
            } else {
                storedHighScores.unshift(HighScore);
            } 
        
        }
    // If no stored high scores exist:
    } else {
            storedHighScores = [HighScore];
    }
    localStorage.setItem("HighScores", JSON.stringify(storedHighScores))
    loadHighScores(storedHighScores);
}

function loadHighScores(storedHighScores) {
    var container = document.querySelector(".container");
    
    document.querySelector("p").remove();
    document.querySelector("p").remove();
    document.querySelector("form").remove();
    h1.textContent = "High Scores";
    // Create highscores table
    var highTable = document.createElement("table");
    document.querySelector(".container").appendChild(highTable);
    highTable.setAttribute("style", "background-color: #4E63FF; width: 100%; color: white;")

    // If this is a new high score, display message
    if (newHighScore) {
        var h4 = document.createElement("h4");
        h4.style.color = "red";
        h4.textContent = "New High Score!!!";
        highTable.prepend(h4);
        
}

    for (i=0; i<storedHighScores.length; i++) {
        var row = document.createElement("tr");
        highTable.appendChild(row);
        var score = document.createElement("td");
        score.textContent = `${i+1}. ${storedHighScores[i][0]}-${storedHighScores[i][1]}`;
        if (i%2 === 0) {
            row.setAttribute("style", "background-color: #1E43DF;")
        }
        row.appendChild(score);
    }

    // Buttons
    var restartBtn = document.createElement("button");
    restartBtn.setAttribute("class", "btn");
    restartBtn.setAttribute("id", "restart");
    restartBtn.textContent = "Restart";
    container.appendChild(restartBtn);
    restartBtn.addEventListener("click", () => {window.location.reload()})

    var clearBtn = document.createElement("button");
    clearBtn.setAttribute("class", "btn");
    clearBtn.setAttribute("id", "clear");
    clearBtn.textContent = "Clear HighScores";
    container.appendChild(clearBtn);
    clearBtn.addEventListener("click", () => {
        localStorage.setItem("HighScores", "");
        removeChildren(highTable);
        var row = document.createElement("tr");
        highTable.setAttribute("style", "height: 1.5em;");
    })

}



// Add event listener for Start Quiz
startBtn.addEventListener("click", startQuiz)