/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevRoll, winScore;

activePlayer = 0;
winScore = 100;
prevRoll = 0;

function startGame() {
    scores = [0, 0];
    roundScore = 0;
    gamePlaying = true;
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice-1").style.display = "none";
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("name-" + activePlayer).textContent = "Player " + (activePlayer + 1);
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("winner");
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
    console.log(activePlayer);
}
startGame();
//pisemo funkciju unutar listenera (anonimna funkcija) koja se izvrsava samo kad se klikne botun btn-roll


////////////////////
// ROLL BUTTON
////////////////////

document.querySelector(".btn-roll").addEventListener('click', function () {
    if (gamePlaying) {
        //Generate random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //////////////////////
        //////CHALLENGE 1/////
        //////////////////////
        console.log(dice1, dice2, prevRoll);
        //If a player rolls 2 6's in a row, lose all global score
        if ((prevRoll === dice1 || prevRoll === dice2) && prevRoll === 6) {
            document.querySelector("#score-" + activePlayer).textContent = 0;
            // document.querySelector("#current-" + activePlayer).textContent = 0;
            document.querySelector("#current-0").textContent = 0;
            document.querySelector("#current-1").textContent = 0;
            scores[activePlayer] = 0;
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".dice-1").style.display = "none";
            alert("You rolled two 6 in a row!");
            switchPlayer();
        } else {
            dice1 === 6 ? prevRoll = dice1 : prevRoll = dice2;


            //Display the dice
            document.querySelector(".dice").style.display = "block";
            document.querySelector(".dice-1").style.display = "block";
            document.querySelector(".dice").src = "dice-" + dice1 + ".png";
            document.querySelector(".dice-1").src = "dice-" + dice2 + ".png";

            //Update round score if rolled number wasn't 1
            if (dice1 > 1 && dice2 > 1) {
                roundScore += dice1 + dice2;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
            } else {
                switchPlayer();
            }
        }
    }

});
alert("Please enter final score!");
document.querySelector(".final-score").addEventListener('change', function () {
    winScore = document.querySelector(".final-score").value;
    console.log(winScore);
});


////////////////////
// HOLD BUTTON
////////////////////

document.querySelector(".btn-hold").addEventListener('click', function () {

    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        //Check if player won
        if (scores[activePlayer] >= winScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".dice-1").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            //Next player
            switchPlayer();
        }
    }
});

////////////////////
// NEW GAME BUTTON
////////////////////
document.querySelector(".btn-new").addEventListener("click", startGame);

function switchPlayer() {
    roundScore = 0;
    prevRoll = 0;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice-1").style.display = "none";
}
