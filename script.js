const Gameboard = function() {
    let gameboard = [];
    let rowNumbers = 3;
    let colNumbers = 3;
    let gameOver = false;

    const createBoard = function() {
        for (row = 0; row < rowNumbers; row++) {
            gameboard[row] = [];
            for (column = 0; column < colNumbers; column++) {
                gameboard[row][column] = null;
            }
        }
    }

    const getGameSize = function() {
        return 3;
    }

    const getBoard = function() {
        return gameboard;
    }

    const getGameOver = function() {
        return gameOver;
    }

    const checkIfEmptyCell = function(row, column) {
        if (gameboard[row][column] !== null) {
            return false;
        }
        return true;
    }

    const setSymbol = function(row, column, player) {
        gameboard[row][column] = player.symbol;
    }

    const setGameOver = function(newValue) {
        gameOver = newValue;
    }

    createBoard();

    return {getBoard, setSymbol, checkIfEmptyCell, getGameSize, setGameOver, getGameOver, createBoard};
}

const Game = function(playerOne = `Player One`, playerTwo = `Player Two`) {
    const board = Gameboard();

    const players = [
        {
            name: playerOne,
            symbol: `X`
        },
        {
            name: playerTwo,
            symbol: `O`
        }
    ];
    
    const checkIfTie = function() {
        let emptyCells = 0;
        const theBoard = board.getBoard();
        for (const row of theBoard) {
            for (const column of row) {
                if (column === null) {
                    emptyCells++;
                }
            }
        }
        
        console.log(`Empty cells: ${emptyCells}`);
        if (emptyCells === 0) {
            return true;
        }
    }

    const getGameboard = function() {
        return board;
    }

    const checkPosition = function() {
        const theBoard = board.getBoard();
        const gameSize = board.getGameSize();

        function diagonal() {
            for (i = 0; i < gameSize; i++) {
                if (theBoard[i][i] !== activePlayer.symbol) {
                   return false;
                }
            }
            return true;
        }

        function reverseDiagonal() {
            for (i = 0; i < gameSize; i++) {
                if (theBoard[i][gameSize - i - 1] !== activePlayer.symbol) {
                   return false;
                }
            }
            return true;
        }

        function line() {
            for (i = 0; i < gameSize; i++) {
                let foundLine = true;
                for (j = 0; j < gameSize; j++) {
                    if (theBoard[i][j] !== activePlayer.symbol) {
                        foundLine = false;
                        break;
                    }
                }
                if (foundLine) {
                    return true;
                }
            }
            return false;
        }

        function column() {
            for (i = 0; i < gameSize; i++) {
                let foundLine = true;
                for (j = 0; j < gameSize; j++) {
                    if (theBoard[j][i] !== activePlayer.symbol) {
                        foundLine = false
                        break;
                    }
                }
                if (foundLine) {
                    return true;
                }
            }
            return false;
        }
        
        const checkIfWin = function() {
            if (diagonal() === true || reverseDiagonal() === true || line() === true || column() === true) {
                console.log(`${activePlayer.name} wins !!!`);
                return true;
            }
            return false;
        }

        return {checkIfWin}
    }

    let activePlayer = players[0];

    const getActivePlayer = function() {
        return activePlayer
    }

    const switchPlayer = function() {
       
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    }


    const printRound = function() {
        console.log(`Board changed`);
        console.table(board.getBoard());
        console.log(`${activePlayer.name}'s turn`);
    }

    const playRound = function(row, col) {
        if (board.checkIfEmptyCell(row, col) === false) {
            return;
        }
        board.setSymbol(row, col, activePlayer);
        const check = checkPosition();
        if (check.checkIfWin() === true) {
            board.setGameOver(true);
            const announcer = document.querySelector(`.announcer`);
            announcer.textContent = `${activePlayer.name} wins !!!`
            return;
        }
        if (checkIfTie() === true) {
            const announcer = document.querySelector(`.announcer`);
            announcer.textContent = `It's a tie!`
            return;
        }
        switchPlayer();
        console.table(board.getBoard());
        printRound();
    }

    return {switchPlayer, playRound, checkPosition, getBoard: board.getBoard, getActivePlayer, getGameboard};
}

const printBoard = function(playerNameOne, playerNameTwo) {
    restartButton(playerNameOne, playerNameTwo)
    const game = Game(playerNameOne, playerNameTwo);
    const gameboard = game.getGameboard();
    const boardDiv = document.querySelector(`.gameboard`);
    const playerTurnDiv = document.querySelector(`.playerTurn`);
    
    const updateScreen = function() {
        boardDiv.textContent = ``;
        playerTurnDiv.textContent = `${game.getActivePlayer().name}'s turn`
        const board = game.getBoard();
        board.forEach(function(row, rowIndex) {
            const cellRow = document.createElement(`div`);
            cellRow.setAttribute(`class`, `cellRow`);
            boardDiv.appendChild(cellRow);
            row.forEach(function(column, index) {
                const col = document.createElement(`button`);
                col.setAttribute(`class`, `cellCol ${rowIndex}${index}`);
                if (board[rowIndex][index]) {
                    col.textContent = `${board[rowIndex][index]}`;
                }
                cellRow.appendChild(col);
            })
        })
    }

    function updateOnClick(e) {
        if (gameboard.getGameOver() === true) {
            return;
        }
        const selectedCol = e.target.getAttribute(`class`, `cellCol`);
        if (!selectedCol) {
            return;
        }
        const allCells = document.querySelectorAll(`.cellCol`);
        let row = null;
        let col = null;
        for (const item of allCells) {
            if (item.getAttribute(`class`) === selectedCol) {
                row = item.classList[1][0];
                col = item.classList[1][1];
            }
        }
        console.log(`${row}, ${col}`);
        game.playRound(row, col);
        updateScreen()
    }
    boardDiv.addEventListener(`click`, updateOnClick);
    updateScreen();
}

const restartButton = function(player1, player2) {
    const container = document.querySelector(`.container`);
    if (!document.querySelector(`.restartBtn`)) {
        const restartBtn = document.createElement(`button`);
        restartBtn.setAttribute(`class`, `restartBtn`);
        restartBtn.textContent = `NEW GAME`;
        container.appendChild(restartBtn);
        restartBtn.addEventListener(`click`, restartGame.bind(this, player1, player2));
        
    }
}

function restartGame(player1, player2) {
    const announcer = document.querySelector(`.announcer`);
    announcer.textContent = ``
    printBoard(player1, player2);
}

const displayStartButton = function() {
    const boardDiv = document.querySelector(`.gameboard`);
    const container = document.querySelector(`.container`);
    const startBtn = document.createElement(`button`);
    const fieldset1 = document.createElement(`fieldset`);
    const fieldset2 = document.createElement(`fieldset`);
    const legend1 = document.createElement(`legend`);
    const legend2 = document.createElement(`legend`);
    const list1 = document.createElement(`ul`).appendChild(document.createElement(`li`));
    const list2 = document.createElement(`ul`).appendChild(document.createElement(`li`)); 
    const input1 = document.createElement(`input`);
    const input2 = document.createElement(`input`);

    startBtn.setAttribute(`class`, `startBtn`);
    input1.setAttribute(`type`, `text`);
    input1.setAttribute(`placeholder`, `Name`);
    input1.setAttribute(`class`, `player1`)
    input2.setAttribute(`type`, `text`);
    input2.setAttribute(`placeholder`, `Name`);
    input2.setAttribute(`class`, `player2`);

    legend1.textContent = `Player One:`;
    legend2.textContent = `Player Two:`;
    startBtn.textContent = `START GAME`;

    boardDiv.appendChild(fieldset1);
    boardDiv.appendChild(fieldset2);
    fieldset1.appendChild(legend1);
    fieldset1.appendChild(list1);
    list1.appendChild(input1);
    fieldset2.appendChild(legend2);
    fieldset2.appendChild(list2);
    list2.appendChild(input2);
    container.appendChild(startBtn);
    
    startBtn.addEventListener(`click`, sendInfoToBoard)
}

function sendInfoToBoard() {
    const player1Name = document.querySelector(`.player1`).value;
    const player2Name = document.querySelector(`.player2`).value;
    const startBtn = document.querySelector('.startBtn');
    if (player1Name !== player2Name && player1Name.length > 0 && player2Name.length > 0) {
        startBtn.style.display = 'none';
        printBoard(player1Name, player2Name);
    }
}

displayStartButton();