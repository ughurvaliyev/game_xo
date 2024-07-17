document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const statusDisplay = document.getElementById('status');
  const resetButton = document.getElementById('reset');
  const scoreX = document.getElementById('score-x');
  const scoreO = document.getElementById('score-o');
  let board = Array(9).fill(null);
  let currentPlayer = 'X';
  let gameActive = true;
  let scores = { 'X': 0, 'O': 0 };

  const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];

  const handleCellClick = (e) => {
      const index = e.target.getAttribute('data-index');

      if (board[index] || !gameActive || currentPlayer !== 'X') return;

      makeMove(index);
      if (gameActive) {
          currentPlayer = 'O';
          setTimeout(computerMove, 500);
      }
  };

  const makeMove = (index) => {
      board[index] = currentPlayer;
      cells[index].textContent = currentPlayer;
      checkResult();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (gameActive) {
          statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
      }
  };

  const computerMove = () => {
      const availableCells = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
      if (availableCells.length > 0 && gameActive) {
          const move = availableCells[Math.floor(Math.random() * availableCells.length)];
          makeMove(move);
          currentPlayer = 'X';
      }
  };

  const checkResult = () => {
      let roundWon = false;

      for (let i = 0; i < winningConditions.length; i++) {
          const [a, b, c] = winningConditions[i];
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              roundWon = true;
              highlightWinningCells([a, b, c]);
              break;
          }
      }

      if (roundWon) {
          statusDisplay.textContent = `Player ${currentPlayer} has won!`;
          gameActive = false;
          updateScore();
          return;
      }

      if (!board.includes(null)) {
          statusDisplay.textContent = 'Game ended in a draw!';
          gameActive = false;
      }
  };

  const highlightWinningCells = (winningCells) => {
      winningCells.forEach(index => {
          cells[index].classList.add('winner');
      });
  };

  const updateScore = () => {
      scores[currentPlayer]++;
      if (currentPlayer === 'X') {
          scoreX.textContent = scores['X'];
      } else {
          scoreO.textContent = scores['O'];
      }
  };

  const resetGame = () => {
      board.fill(null);
      gameActive = true;
      currentPlayer = 'X';
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
      cells.forEach(cell => {
          cell.textContent = '';
          cell.classList.remove('winner');
      });
  };

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetButton.addEventListener('click', resetGame);
});
