const buttonsEl = document.querySelector('.buttons');
const playerScoreEl = document.querySelector('.player-score');
const computerScoreEl = document.querySelector('.computer-score');
const resultEl = document.querySelector('.result');
const finalResultEl = document.querySelector('.final-result');

const choices = ['rock', 'paper', 'scissors'];
const scores = {
  player: 0,
  computer: 0,
};

const updateScoresUI = function (scores) {
  playerScoreEl.textContent = scores.player;
  computerScoreEl.textContent = scores.computer;
  if (scores.player >= 5 || scores.computer >= 5) {
    const btns = document.querySelectorAll('button');
    btns.forEach((btn) => {
      btn.disabled = true;
      finalResultEl.textContent = `${
        scores.player > scores.computer ? 'Player Wins.' : 'Computer Wins.'
      } Please reload the page to play again`;
    });
  }
};

const getComputerChoice = function () {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
};

const playRound = function (playerSelection, computerSelection) {
  if (
    (playerSelection === 'rock' && computerSelection === 'paper') ||
    (playerSelection === 'paper' && computerSelection === 'scissors') ||
    (playerSelection === 'scissors' && computerSelection === 'rock')
  ) {
    scores.computer++;
    return `Computer Wins! ${computerSelection} beats ${playerSelection}`;
  } else if (playerSelection === computerSelection) {
    return `It's a tie!`;
  } else {
    scores.player++;
    return `Player Wins! ${playerSelection} beats ${computerSelection}`;
  }
};

buttonsEl.addEventListener('click', function (e) {
  const playerSelection = e.target.dataset.choice;
  const computerSelection = getComputerChoice();
  const result = playRound(playerSelection, computerSelection);
  resultEl.textContent = result;
  updateScoresUI(scores);
});
