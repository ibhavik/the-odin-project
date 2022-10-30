const game = (function () {
  let player1 = 'X';
  let player2 = 'O';
  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameOver = false;

  // Dom Elements
  containerEl = document.querySelector('.container');
  btnReset = document.querySelector('.btn-reset');
  blocks = document.querySelectorAll('.block');

  // Event Listeners
  containerEl.addEventListener('click', addMarker);
  btnReset.addEventListener('click', resetBoard);

  function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? player2 : player1;
  }

  function resetBoard() {
    blocks.forEach((element) => {
      element.textContent = '';
    });
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
  }

  function addMarker(e) {
    if (!gameOver) {
      currentIndex = e.target.dataset.index;
      if (markerExists()) return;
      e.target.textContent = currentPlayer;
      gameBoard[currentIndex] = currentPlayer;
      gameOver = checkWinner();
      if (!gameOver) switchPlayer();
    }
  }

  function markerExists() {
    if (gameBoard[currentIndex] === 'X' || gameBoard[currentIndex] === 'O') {
      return true;
    } else {
      return false;
    }
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
    ];
    const won = winningCombinations
      .filter((combination) => combination.includes(+currentIndex))
      .some((possibleCombination) => {
        return possibleCombination.every(
          (index) => gameBoard[index] === currentPlayer
        );
      });
    if (won) {
      console.log(`Winner : ${currentPlayer}`);
    }
    return won;
  }
})();
