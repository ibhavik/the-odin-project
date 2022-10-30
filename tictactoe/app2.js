const game = {
  player1: 'X',
  player2: 'O',
  currentPlayer: 'X',
  gameBoard: ['', '', '', '', '', '', '', '', ''],
  gameOver: false,

  init() {
    this.getDomElements();
    this.bindEvents();
    this.resetBoard();
  },
  switchPlayer() {
    if (this.currentPlayer === 'X') {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  },
  getDomElements() {
    this.containerEl = document.querySelector('.container');
    this.btnReset = document.querySelector('.btn-reset');
    this.blocks = document.querySelectorAll('.block');
  },

  resetBoard() {
    this.blocks.forEach((element) => {
      element.textContent = '';
    });
    this.gameBoard = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayer = 'X';
    this.gameOver = false;
  },

  bindEvents() {
    this.containerEl.addEventListener('click', this.addMarker.bind(this));
    this.btnReset.addEventListener('click', this.init.bind(this));
  },
  addMarker(e) {
    if (!this.gameOver) {
      this.currentIndex = e.target.dataset.index;
      if (this.markerExists()) return;
      e.target.textContent = this.currentPlayer;
      this.gameBoard[this.currentIndex] = this.currentPlayer;
      this.gameOver = this.checkWinner();
      if (!this.gameOver) this.switchPlayer();
    }
  },

  markerExists() {
    if (
      this.gameBoard[this.currentIndex] === 'X' ||
      this.gameBoard[this.currentIndex] === 'O'
    ) {
      return true;
    } else {
      return false;
    }
  },

  checkWinner() {
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
      .filter((combination) => combination.includes(+this.currentIndex))
      .some((possibleCombination) => {
        return possibleCombination.every(
          (index) => this.gameBoard[index] === this.currentPlayer
        );
      });
    if (won) {
      console.log(`Winner : ${this.currentPlayer}`);
    }
    return won;
  },
};

game.init();
