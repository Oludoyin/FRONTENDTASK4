const question = document.getElementById("questions");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
//const questionCounterText = document.getElementById("questionCounter");
const progressBarFull = document.getElementById("progressBarFull");
const scoreText = document.getElementById("score");
const next = document.getElementById("next");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    { 
       question: 'The following are ways to create a variable except one, which is ?',
       choice1: 'const',
       choice2: 'let',
       choice3: 'for',
       choice4: 'var',
       answer: 3
    },

    {
        question: 'One of these is not a problem solving tip on coding, which is?',
        choice1: 'Just dive into coding',
        choice2: 'Identify outputs and inputs',
        choice3: 'Test as you go',
        choice4: 'outline your approach',
        answer: 1

    },

    {
        question: 'The full meaning of DOM is ?',
        choice1: 'Direct Order Model',
        choice2: 'Document Object Model',
        choice3: 'Deviated Ordering Monitor',
        choice4: 'Do Our Masks',
        answer: 2
    },

    {
        question: 'To create a new h4 element using JavaScript through HTML, the correct syntax is ?',
        choice1: 'document.innerText ="h4"',
        choice2: 'document.querySelector("h4")',
        choice3: 'addEventListener("h4")',
        choice4: 'document.createElement("h4")',
        answer: 4

    },

    {
        question: 'To link a style.css file to an html file, which of these syntax is applicable ?',
        choice1: '<a href="style.css"></a>',
        choice2: '<head>Style.css</head>',
        choice3: '<link href="style.css" rel="stylesheet"/>',
        choice4: '<title>Style.css</title>',
        answer: 3
    }





];

//constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewquestion();
};




 getNewquestion = e => {
     
        if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem("mostRecentScore", score);
            //go to the end page
            return window.location.assign("end.html");
        }

   
        questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //update progress bar
    //console.log((questionCounter/MAX_QUESTIONS) * 100);
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;


    choices.forEach(choice => {
       const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
  
};



choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        //get a list of all choices
        const allChoices = document.querySelectorAll('.choice-text');
        //select the correct choice
        const correctChoice = allChoices[currentQuestion.answer - 1];
        //add "correct class to the correct choice"
        correctChoice.parentElement.classList.add("correct");
           setTimeout( () => {
               correctChoice.parentElement.classList.remove("correct");
           }, 1000 );

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
            
        }
           selectedChoice.parentElement.classList.add(classToApply);
          
           setTimeout ( () => {
               selectedChoice.parentElement.classList.remove(classToApply);
               //getNewquestion ();
           }, 1000);
           // 1000);

    });

});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();