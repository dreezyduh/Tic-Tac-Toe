
const Gameboard = function() {
    let gameboard = [];
    const rows = 3;
    const columns = 3;
    const error = throwError();
    for (i = 0; i < rows; i++) {
        gameboard[i] = [];
        for (j = 0; j < columns; j++) {
            gameboard[i].push(Cell());
        }
    }
    const getBoard = () => gameboard;
    
    const drawSymbol = (row, col, player) => {
        const emptyCells = gameboard.filter((row) => row[col].getValue() === 0).map((row) => row[col]);
        if (!emptyCells.length) return;
        if (gameboard[row][col].getValue() === 0) {
            gameboard[row][col].getSymbol(player);
        } else {
            console.log(`Cell is not empty`);
            error.addError(1);
        }
    };

    const printBoard = () => {
        const boardWithCells = gameboard.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCells);
    };

    return {getBoard, drawSymbol, printBoard, getError: error.getError, addError: error.addError}
}

function Cell() {
    let value = 0;

    const getValue = function() {
        return value;
    };

    const getSymbol = function(player) {
        return value = player;
    };

    return {getValue, getSymbol};
}

function throwError() {
    let error = 0;

    const getError = function() {
        return error
    }

    const addError = function(number) {
        return error = number;
    }

    return {getError, addError}
}

function winRound() {
    let win = 0;

    const checkWin = function() {
        return win
    }

    const setWin = function(value) {
        return win = value;
    }

    return {checkWin, setWin}
}

function GameController(playerOneName = `Player One`, playerTwoName = `Player Two`) {
    const theBoard = Gameboard();

    const win = winRound();

    const players = [
        {
            name: playerOneName,
            symbol: `X`
        },
        {
            name: playerTwoName,
            symbol: `O`
        }
    ];

    const checkPosition = (function() {
        const diagonal = function(row, column) {
            const oneSymbol = theBoard.getBoard()[row][column].getValue();
            row = +row;
            column = +column;
            let twoSymbol = ``;
            let threeSymbol = ``;
            if (row - 1 >= 0 && column - 1 >= 0) {
                twoSymbol = theBoard.getBoard()[row - 1][column - 1].getValue();
                if (row - 2 >= 0 && column - 2 >= 0) {
                    threeSymbol = theBoard.getBoard()[row - 2][column - 2].getValue();
                } else if (row + 1 < theBoard.getBoard().length && column + 1 < theBoard.getBoard().length) {
                    threeSymbol = theBoard.getBoard()[row + 1][column + 1]
                }
            } else if (row + 1 < theBoard.getBoard().length && column + 1 < theBoard.getBoard()[row].length) {
                twoSymbol = theBoard.getBoard()[row + 1][column + 1].getValue();
                if (row + 2 < theBoard.getBoard().length && column + 2 < theBoard.getBoard().length) {
                    threeSymbol = theBoard.getBoard()[row + 2][column + 2].getValue();
                }
            }
            if (oneSymbol === twoSymbol && oneSymbol === threeSymbol) {
                return true
            }
        }
        const reverseDiagonal = function(row, column) {
            const oneSymbol = theBoard.getBoard()[row][column].getValue();
            row = +row;
            column = +column;
            let twoSymbol = ``;
            let threeSymbol = ``;
            if (row - 1 >= 0 && column + 1 < theBoard.getBoard()[row].length) {
                twoSymbol = theBoard.getBoard()[row - 1][column + 1].getValue();
                if (row - 2 >= 0 && column + 2 < theBoard.getBoard()[row].length) {
                    threeSymbol = theBoard.getBoard()[row - 2][column + 2].getValue();
                } else if (row + 1 < theBoard.getBoard().length && column - 1 >= 0) {
                    threeSymbol = theBoard.getBoard()[row + 1][column - 1].getValue();
                }
            } else if (row + 1 < theBoard.getBoard().length && column - 1 >= 0) {
                twoSymbol = theBoard.getBoard()[row + 1][column - 1].getValue();
                if (row + 2 < theBoard.getBoard().length && column - 2 >= 0) {
                    threeSymbol = theBoard.getBoard()[row + 2][column - 2].getValue();
                }
            }
            if (oneSymbol === twoSymbol && oneSymbol === threeSymbol) {
                return true
            }
        }
        const rowLine = function(row, column) {
            const oneSymbol = theBoard.getBoard()[row][column].getValue();
            row = +row;
            column = +column;
            let twoSymbol = ``;
            let threeSymbol = ``;
            if (row === row && column + 1 < theBoard.getBoard().length) {
                twoSymbol = theBoard.getBoard()[row][column + 1].getValue();
                if (row === row && column + 2 < theBoard.getBoard().length) {
                    threeSymbol = theBoard.getBoard()[row][column + 2].getValue();
                } else if (row === row && column - 1 >= 0) {
                    threeSymbol = theBoard.getBoard()[row][column - 1].getValue();
                }
            } else if (row === row && column - 1 >= 0) {
                twoSymbol = theBoard.getBoard()[row][column - 1].getValue();
                if (row === row && column - 2 >= 0) {
                    threeSymbol = theBoard.getBoard()[row][column - 2].getValue();
                }
            }
            if (oneSymbol === twoSymbol && oneSymbol === threeSymbol) {
                return true
            }
        }
        const columnLine = function (row, column) {
            const oneSymbol = theBoard.getBoard()[row][column].getValue();
            row = +row;
            column = +column;
            let twoSymbol = ``;
            let threeSymbol = ``;
            if (row - 1 >= 0) {
                twoSymbol = theBoard.getBoard()[row - 1][column].getValue();
                if (row - 2 >= 0) {
                    threeSymbol = theBoard.getBoard()[row - 2][column].getValue();
                }
                else if (row + 1 < theBoard.getBoard().length) {
                    threeSymbol = theBoard.getBoard()[row + 1][column].getValue();
                }
            } else if (row + 1 < theBoard.getBoard().length) {
                twoSymbol = theBoard.getBoard()[row + 1][column].getValue();
                if (row + 2 < theBoard.getBoard().length) {
                    threeSymbol = theBoard.getBoard()[row + 2][column].getValue();
                }
            }
            if (oneSymbol === twoSymbol && oneSymbol === threeSymbol) {
                return true
            }
        }
        return {diagonal, reverseDiagonal, rowLine, columnLine};
    })()

    function announceWin() {
        const announcer = document.querySelector(`.announcer`);
        announcer.textContent = `${getActivePlayer().name} wins!`;
    }
    
    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printRound = () => {
        theBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const playRound = (row, column) => {
        if (win.checkWin() === 1 || win.checkWin() === 2) return;
        theBoard.drawSymbol(row, column, getActivePlayer().symbol);
        if (theBoard.getError() === 1) {
            theBoard.addError(0);
            return
        }
        console.log(`Putting ${getActivePlayer().symbol} into row ${row} column ${column} by ${getActivePlayer().name}`);
        if (checkPosition.diagonal(row,column) ||
            checkPosition.reverseDiagonal(row, column) ||
            checkPosition.rowLine(row,column) ||
            checkPosition.columnLine(row,column)) {
                announceWin()
                win.setWin(1)
                return
        } else {
                const emptyCells = theBoard.getBoard().map((rows) => rows.filter((columns) => columns.getValue() === 0));
                if ((emptyCells.filter((rows) => rows.length > 0)) < 1) {
                    const announcer = document.querySelector(`.announcer`);
                    announcer.textContent = `It's a tie!`;
                    win.setWin(2)
                    return
                };
        }
        switchPlayer();
        printRound();
    };
    printRound();
    return {playRound, getActivePlayer, getBoard: theBoard.getBoard};
}



function screenController() {
    restartGame()
    const game = GameController();
    const boardDiv = document.querySelector(`.gameboard`);
    const playerTurnDiv = document.querySelector(`.playerTurn`);
    const updateScreen = () => {
        boardDiv.textContent = ``;
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        playerTurnDiv.textContent = `${activePlayer.name}'s turn`
        board.forEach((row, rowIndex) => {
            const cellRow = document.createElement(`div`);
            cellRow.setAttribute(`class`, `row`);
            row.forEach((cell, index) => {
                const cellBtn = document.createElement(`button`);
                boardDiv.appendChild(cellRow);
                cellBtn.setAttribute(`class`, `cell ${rowIndex}${index}`);
                cellBtn.textContent = cell.getValue();
                if (cellBtn.textContent === `0`) {
                    cellBtn.textContent = ``;
                }
                cellRow.appendChild(cellBtn);
            })
        });
    }
    function clickHandlerBoard(e) {
        const selectedCol = e.target.getAttribute(`class`, `cell`);
        const positions = document.querySelectorAll(`.cell`);
        let finalPos = ``;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                finalPos = [...positions].filter( function(pos) {
                    return pos.getAttribute(`class`, `cell ${i}${j}`) === selectedCol
                });
            }
        }
        if (!selectedCol) return;
        const colPos = String(finalPos[0].classList[1]).at(-1);
        const rowPos = String(finalPos[0].classList[1]).at(-2)
        game.playRound(rowPos, colPos);
        updateScreen();
    }
    boardDiv.addEventListener(`click`, clickHandlerBoard);
    updateScreen();
}

function restartGame() {
    const Board = document.querySelector(`.container`);
    const announce = document.querySelector(`.announcer`);
    announce.textContent = ``;
    if (!document.querySelector(`.restartbtn`)) {
        const restartBtn = document.createElement(`button`);
        restartBtn.setAttribute(`class`, `restartbtn`)
        restartBtn.textContent = `NEW GAME`;
        Board.appendChild(restartBtn);
        restartBtn.addEventListener(`click`, screenController);
    }
}

function displayButtons() {
    const Board = document.querySelector(`.gameboard`);
    const startBtn = document.createElement(`button`);
    startBtn.textContent = `START GAME`;
    startBtn.addEventListener(`click`, screenController);
    Board.appendChild(startBtn);
}

displayButtons();