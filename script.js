document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const resultScreen = document.querySelector(".result-screen");
    const overlay = document.querySelector(".overlay");
    const resetButton = document.getElementById("resetButton");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Create the Tic-Tac-Toe board
    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-index", i);
            cell.addEventListener("click", () => handleCellClick(i));
            board.appendChild(cell);
        }
    }

    // Handle cell click
    function handleCellClick(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                displayWinner();
            } else if (gameBoard.every((cell) => cell !== "")) {
                displayResult("It's a tie!");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    // Render the Tic-Tac-Toe board
    function renderBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.querySelector(`.cell[data-index="${i}"]`);
            cell.textContent = gameBoard[i];
        }
    }

    // Check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    // Display winner screen
    function displayWinner() {
        resultScreen.innerHTML = `<p>${currentPlayer} wins!</p>`;
        overlay.style.display = "flex";
    }

    // Display result screen
    function displayResult(message) {
        resultScreen.innerHTML = `<p>${message}</p>`;
        overlay.style.display = "flex";
    }

    // Reset the game
    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        renderBoard();
        overlay.style.display = "none";
    }

    // Initialize the game
    createBoard();

    // Reset button event listener
    resetButton.addEventListener("click", resetGame);
});
