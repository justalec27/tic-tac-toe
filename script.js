/*
Psuedo code:
1. Create a gameboard; which has 3 rows and 3 columns
2. create players, 1 or 2 players
3. Players can put a token in turns, with X or O
    - User select row and column to place cell
    -check if cell is available (i.d. equal to 0)
    - If cell is available, place token
    - If not available, ask user to choose a new cell
    - after placing token, switch to other player
4. Player that has 3 tokens in a row will wine

Update 4 aug; 
Loop door de formules en creer functie voor het plaatsen van een token, wss door regel en kolom.

*/

function GameBoard() {
    //Create the board for the game, 3x3 grid
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

    const dropToken = (row, column, player) => {
        board[row][column].addToken(player);
    }

    const checkAvailability = (row ,column) => {
       if (board[row][column].getValue() != 0) {
            console.log(`This cell is not available. Choose again.`);  
            return false;
        } 
        return true;
    }       

    // Print the game in developer
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return {
        getBoard,
        printBoard,
        dropToken,
        checkAvailability,
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


function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
    ) {
    
    const board = GameBoard()

    const players = [{ name: playerOneName, token: 1}, { name: playerTwoName, token: 2}];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
        activePlayer = players[1];
        } else {
        activePlayer = players[0];
        }
    };

    const getActivePlayer = () => activePlayer

    const printNewRound = () => {
        board.printBoard();
        console.log(`It's ${getActivePlayer().name}'s turn.`)
    }
    const playRound = (row, column) => {
    //Drop a token for the current player
        
        if (board.checkAvailability(row, column) === false ){
            return false
        } else {
        board.dropToken(row, column, getActivePlayer().token);
        console.log(`Dropping ${getActivePlayer().name}'s token into row ${row}, column ${column}.`);

            /*  This is where we would check for a winner and handle that logic,
            such as a win message. */
        
        // Switch player turn
        switchPlayerTurn();
        printNewRound();
        return true
        }};
        
    //Initial game message
    printNewRound();


    return {
        getActivePlayer,
        playRound,
    }
}

const game = GameController();
