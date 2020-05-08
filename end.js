const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");



//to save it in a local storage, it has to be a string
//so we have to convert the array to a string using JSON 
//localStorage.setItem("highscores", JSON.stringify([]));
//console.log(JSON.parse(localStorage.getItem("highscore")));

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    //console.log(username.value);
    saveScoreBtn.disabled = !username.value;
});

savehighScore = e => {
   console.log("clicked save button!");
     e.preventDefault();


    const score = {
        score: mostRecentScore,
        name: username.value
    };

    console.log(score);
};
