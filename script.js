/*
Psuedo code:
1. Create a gameboard; which has 3 rows and 3 columns
2. create players, 1 or 2 players
3. Players can put a token in turns, with X or O
4. Player that has 3 tokens in a row will wine



*/

function GameBoard() {
    const rows = 3;
    const columns = 3; 
    const board = [];

    for (let i = 0; i < rows; i ++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
         board[i].push(Cell())
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return {
        getBoard,
        printBoard,
    };
}







/* 
** A Cell respresents one "square" on the board and can have one of the follow values:
** 0: no token is in the square,
** 1: Player ONE's token,
** 2: Player TWO's token, 
*/

function Cell() {
    let value = 0
    
    // Accepts a player's token to chang the value of the cell
    const addToken = (player) => {
        value = player;
    };

    // Retrieve current valie of this cell
    const getValue = () => value;
    
    return {
        addToken, 
        getValue
    };

}

const board = GameBoard()
board.printBoard()