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
    removeChildren(container);
    
    // Uncenter elements within container
    container.setAttribute("class", "container");
    
    // create elements (Title and four buttons)
    var header = document.createElement("h1");
    header.textContent = "Question 1";
    container.appendChild(header);
    
    var button1 = document.createElement("button");
    button1.setAttribute("class", "btn block");
    button1.setAttribute("id", "button1")
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
    button4.addEventListener("click", evalAnswer)

    // Call loadNext() to load questions.
    loadNext();
    // call quizTimer(start)
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

var seconds = 60;
function quizTimer(action) {
    // action can be start, stop, or subtract
    // if action === "start" etc
}

var questionIndex = 0;

function loadNext() {
    if (questionIndex >= questionArray.length) {
        // Clear page of elements inside container
        var container = document.querySelector(".container")
        removeChildren(container);
        // Add header "All done!"
        var header = document.createElement("h1");
        header.textContent = "All done!";
        container.appendChild(header);
        // Add p
        var p = document.createElement("p");
        p.innerHTML = `Your final score is ${seconds}!`
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
    // Check if button clicked is the correct answer
    if (questionArray[questionIndex][buttonId][1]) {
        // Play Sound
        console.log("correct!");
    } else {
        // Play Sound
        // subtract 10 seconds
        console.log("incorrect!")
    }
    questionIndex++;
    // call loadNext
    loadNext()
}


// Add event listener for Start Quiz
startBtn.addEventListener("click", startQuiz)