// TODO Undo Bootstrap

// Start page is loaded at top 
// Define start quiz button
var startBtn = document.querySelector("#start");

// instatiate question array
var questionArray = [{question: "First Question", "button1": ["ans1", true], "button2": ["ans2", false], "button3": ["ans3", false], "button4": ["ans4", false]}, 
                     {question: "Second Question", "button1": ["ans1", false], "button2": ["ans2", true], "button3": ["ans3", false], "button4": ["ans4", false]}, 
                     {question: "Third Question", "button1": ["ans1", false], "button2": ["ans2", false], "button3": ["ans3", true], "button4": ["ans4", false]}
]

// Function run by Start Quiz click
function startQuiz() {
    // remove start page
    var container = document.querySelector(".container");
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
    button2.setAttribute("id", "button2")
    container.appendChild(button2);
    button2.addEventListener("click", evalAnswer)

    
    var button3 = document.createElement("button");
    button3.setAttribute("class", "btn block");
    button3.setAttribute("id", "button3")
    container.appendChild(button3);
    button3.addEventListener("click", evalAnswer)

    
    var button4 = document.createElement("button");
    button4.setAttribute("class", "btn block");
    button4.setAttribute("id", "button4")
    container.appendChild(button4);
    button4.addEventListener("click", evalAnswer);

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

    // Call loadNext() to load questions.
    loadNext();
    // start timer
    quizTimer("start")
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

var seconds = 20;
var timerRunning = true;
function quizTimer() {
        // Create display of timer
        var timerElement = document.createElement("p");
        timerElement.setAttribute("style", "text-align: end;")
        timerElement.textContent = `You have ${seconds} seconds left!!`;
        document.body.prepend(timerElement);
        // Set timer with setInterval()
        var timer = setInterval(() => {
            if (timerRunning) {
                if (seconds > 1) {
                    seconds--;
                    timerElement.textContent = `You have ${seconds} seconds left!!`;
                } else {
                    // Clear page
                    removeChildren(document.body);
                    // Display FAILED page
                    var failed = document.createElement("p");
                    failed.setAttribute("style", "font-size: 100px; color: red; text-align: center;")
                    failed.innerHTML = "FAILED!<br>";
                    document.body.appendChild(failed);
                    
                    var tryAgain = document.createElement("button");
                    tryAgain.setAttribute("class", "btn")
                    tryAgain.setAttribute("onClick", "window.location.reload();")
                    tryAgain.textContent = "Try Again";
                    failed.appendChild(tryAgain);
                    clearInterval(timer)
                }
            } else {
                clearInterval(timer);
            }
        }, 1000);
}     

var questionIndex = 0;

function loadNext() {
    if (questionIndex >= questionArray.length) {
        timerRunning = false;
        // Clear page of elements inside container
        var container = document.querySelector(".container")
        var buttons = document.querySelectorAll(".btn");
        for (i=0; i<buttons.length; i++) {
            buttons[i].remove();
        }
        // Add header "All done!"
        document.querySelector("h1").textContent = "All done!";
        // Change text content of <p>
        var p = document.createElement("p");
        p.textContent = `Your final score is ${seconds}!`;
        container.appendChild(p);
        // Add initals input field
        var initials = document.createElement("input");
        initials.setAttribute("type", "text");
        initials.setAttribute("placeholder", "Enter your initials");
        container.appendChild(initials);
        // Add submit Button
        var submitBtn = document.createElement("button");
        submitBtn.setAttribute("class", "btn");
        submitBtn.textContent = "Submit";
        container.appendChild(submitBtn);
    } else {
    // Load in values for question header and 4 buttons. Use an array of objects. Object.keys(object) will give the keys
    var content = questionArray[questionIndex];
    document.querySelector("h1").textContent = content.question;
    for (i=1; i<5; i++) {
        document.querySelector(`#button${i}`).textContent = content[`button${i}`][0];
    }
    // Set which button is correct. Correct/incorrect stored in key values. Set class?
    // On any button press call evalAnswer()
    // Increment questionIndex
    }
}

function evalAnswer(event) {
    // get value of button from event
    var buttonId = event.target.id;
    var hr = document.querySelector("hr");
    var correct = document.querySelector("#correct")
    
    // Check if button clicked is the correct answer
    if (questionArray[questionIndex][buttonId][1]) {
        // Load success sound
        var audio = new Audio('assets/success.mp3');
        correct.textContent = "Correct!";
    } else {
        // Load failure sound
        var audio = new Audio('assets/failure.mp3');
        correct.textContent = "Incorrect!";
        // subtract 10 seconds
        seconds -= 10;
        // Display incorrect with timeout
        console.log("Incorrect!")
    }
    // Show hr
    hr.setAttribute("style", "display: block;");
    // Remove elements after 1 second
    setTimeout(() => {
        hr.setAttribute("style", "display: none;");
        correct.textContent = "";
    }, 1000);
    // play sound
    audio.play();
    questionIndex++;
    // call loadNext
    loadNext()
}


// Add event listener for Start Quiz
startBtn.addEventListener("click", startQuiz)