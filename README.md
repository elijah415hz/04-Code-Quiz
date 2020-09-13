# 04-Code-Quiz

Code-Quiz is a short quiz web application with questions about JavaScript. It dynamically generates each quiz question and answer set using an array of objects that can easily be updated to change the content and length of the quiz. 
It incorporates a timer that subtracts 10 seconds from the remaining time left in the quiz for every wrong answer, and plays short sound effects as an audio cue for correct or incorrect answers. The number of seconds remaining on the timer becomes the user's score.
At the end of the quiz it collects the user's initials and creates a leaderboard with persistant values that the user can clear.
Code-Quiz is mobile responsive through the use of CSS media queries and responsive font sizing. 

This site is deployed at https://elijah415hz.github.io/04-Code-Quiz/

## Assigment from the client
### User Story

```
AS A coding bootcamp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

### Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```

The following animation demonstrates the application functionality:

![code quiz](./assets/04-web-apis-homework-demo.gif)