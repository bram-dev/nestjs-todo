const elemRockButton = document.getElementById("rockButton");
const elemPaperButton = document.getElementById("paperButton");
const elemScissorsButton = document.getElementById("scissorsButton");
const para = document.querySelector("p");
const elemPlayerChoice = document.getElementById("playerChoiceH2");
const elemComputerChoice = document.getElementById("computerChoiceH2")
const paraLoses = document.getElementById("resultLoses");
const paraWins = document.getElementById("resultWins");
const paraDraws = document.getElementById("resultDraws");

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getComputerChoice() {
    let choices = ["Rock", "Paper", "Scissors"];
    return choices[random(0,3)];
}

let playerSelection;
let computerSelection;
let result;

function playRound(playerSelection, computerSelection) {
    let result;
    if(playerSelection === computerSelection){
        result = "Draw";
    } else {
        switch(playerSelection) {
            case "Rock":
                if(computerSelection === "Scissors"){
                    result = "Win";
                } else {
                    result = "Lose"
                }
            case "Paper":
                if(computerSelection === "Rock"){
                    result = "Win";
                } else {
                    result = "Lose"
                }
            case "Scissors":
                if(computerSelection === "Paper"){
                    result = "Win";
                } else {
                    result = "Lose"
                }
            }
        }
    return result;
}

function printResult(result) {
    switch(result) {
        case "Draw":
            result = "Draw";
            break;
        case "Win":
            result = "You win! " + playerSelection + " beats " + computerSelection;
            break;
        case "Lose":
            result = "You lose! " + computerSelection + " beats " + playerSelection;
    }
    return para.textContent = result;
}

elemRockButton.addEventListener("click", function() {
    playerSelection = "Rock";
    computerSelection = getComputerChoice();
    elemComputerChoice.textContent = computerSelection;
    elemPlayerChoice.textContent =  playerSelection;
    result = playRound(playerSelection, computerSelection);
    calcResults(result);
    return printResult(result);
});

elemPaperButton.addEventListener("click", function() {
    playerSelection = "Paper";
    computerSelection = getComputerChoice();
    elemComputerChoice.textContent = computerSelection;
    elemPlayerChoice.textContent =  playerSelection;
    result = playRound(playerSelection, computerSelection);
    calcResults(result);
    return printResult(result);
});

elemScissorsButton.addEventListener("click", function() {
    playerSelection = "Scissors";
    computerSelection = getComputerChoice();
    elemComputerChoice.textContent = computerSelection;
    elemPlayerChoice.textContent =  playerSelection;
    result = playRound(playerSelection, computerSelection);
    calcResults(result);
    return printResult(result);
});

let wins = 0;
let loses = 0;
let draws = 0;

function calcResults(result){
    switch(result){
        case "Win":
            wins++;
            return paraWins.textContent = wins;  
        case "Lose":
            loses++;
            return paraLoses.textContent =  loses;
        case "Draw":
            draws++;
            return paraDraws.textContent = draws;
    }
}