/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevRoll;

activePlayer = 0;


function startGame() {
    scores = [0, 0];
    roundScore = 0;
    gamePlaying = true;
    document.querySelector(".dice").style.display = "none";
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
        var dice = Math.floor(Math.random() * 6) + 1;


        //Display the dice
        document.querySelector(".dice").style.display = "block";
        document.querySelector(".dice").src = "dice-" + dice + ".png";


        //Update round score if rolled number wasn't 1
        if (dice > 1) {
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            switchPlayer();
        }
    }

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
        if (scores[activePlayer] >= 100) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
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
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
    document.querySelector(".dice").style.display = "none";
}
