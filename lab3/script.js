const winning_combo = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const board = ["", "", "", "", "", "", "", "", ""];

let computerTurn = false;
let gameOver = false;

function checkWinner(mark) {
    return winning_combo.find(combo => combo.every(i => board[i] === mark));
}

function checkDraw() {
    return board.every(i => i === "X" || i === "O");
}

function getEmptyCells() {
    const emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            emptyCells.push(i);
        }
    }
    return emptyCells;
}

function playerMove(index) {
    if (board[index] === "" && gameOver == false && computerTurn == false) {
        board[index] = "X";
        let cell = document.getElementById("c" + index);
        cell.textContent = "X";

        if (checkWinner("X")) {
            gameOver = true;
            document.getElementById("status").innerText = "YOU WON!!!";
        }
        else if (checkDraw()) {
            gameOver = true;
            document.getElementById("status").innerText = "IT'S A DRAW!!!";
        }
        else {
            computerMove();
        }

    }
}

function computerMove() {
    let move = -1;

    for (let mark of ["O", "X"]) {
        for (let combo of winning_combo) {
            const empty = combo.filter(i => board[i] === "");
            const filled = combo.filter(i => board[i] === mark);
            if (filled.length === 2 && empty.length === 1) {
                move = empty[0];
                break;
            }
        }
        if (move != -1) {
            break;
        }
    }
    if (move == -1) {
        const emptyCells = getEmptyCells();
        move = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    }
    const myTimeout = setTimeout(() => {
        board[move] = "O";
        document.getElementById("c" + move).textContent = "O";

        if (checkWinner("O")) {
            gameOver = true;
            document.getElementById("status").innerText = "COMPUTER WON!!!";
        }
        else if (checkDraw()) {
            gameOver = true;
            document.getElementById("status").innerText = "IT'S A DRAW!!!";
        }
        else {
            computerTurn = false;
            enableListeners()
        }
    }, 500);
}


function enableListeners() {
    for (let i = 0; i < 9; i++) {
        document.getElementById("c" + i).addEventListener("click", () => playerMove(i));
    }
}
enableListeners();

function restartGame() {
    gameOver = false;
    computerTurn = false;
    document.getElementById("status").innerText = "Start playing!";
    for (let i = 0; i < 9; i++) {
        board[i] = "";
        document.getElementById("c" + i).innerText = "";
    }
}
document.getElementById("restart").addEventListener("click", restartGame);
