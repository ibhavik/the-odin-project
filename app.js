const choices = ['rock', 'paper', 'scissors'];
const scores = {
  player: 0,
  computer: 0,
};

const getComputerChoice = function () {
  const index = Math.floor(Math.random() * 3);
  return choices[index];
};

const getPlayerChoice = function () {
  const choice = prompt('Enter you choice').toLowerCase();
  if (choice === 'rock' || choice === 'paper' || choice === 'scissors')
    return choice;
};

const playRound = function (playerSelection, computerSelection) {
  if (
    (playerSelection === 'rock' && computerSelection === 'paper') ||
    (playerSelection === 'paper' && computerSelection === 'scissors') ||
    (playerSelection === 'scissors' && computerSelection === 'rock')
  ) {
    scores.computer++;
    return `Computer Wins! ${computerSelection} beats ${playerSelection}`;
  } else if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper  ')
  ) {
    scores.player++;
    return `Player Wins! ${playerSelection} beats ${computerSelection}`;
  }

  if (
    (playerSelection === 'rock' && computerSelection === 'rock') ||
    (playerSelection === 'paper' && computerSelection === 'paper') ||
    (playerSelection === 'scisssors' && computerSelection === 'scisssors')
  )
    return 'No body wins!';
};

const playGame = function () {
  for (let i = 0; i < 5; i++) {
    const playerSelection = getPlayerChoice();
    const computerSelection = getComputerChoice();
    playRound(playerSelection, computerSelection);
  }

  console.log(scores);
};

playGame();
