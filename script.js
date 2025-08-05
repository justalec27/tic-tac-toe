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
    - create a function to decide on the winner
    - winner wins if 3 tokens in a row horizontally vertically or diagonal
    - the game is a break if the grid is full and no 3 token in a row
    - play new game when grid is full

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

    // Check if the cell is available for token
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


    const resetBoard = () => {
        for (let i = 0 ; i < rows ; i++) {
            for (let j = 0; j < columns; j++){
                board[i][j].addToken(0);
            }
        }
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

    const checkWinner = () => {
        
        const currentBoard = board.getBoard()
        // Check all rows

        for (let i = 0; i < 3; i++){
            if (currentBoard[i][0].getValue() === 1  && 
                currentBoard[i][1].getValue() === 1  && 
                currentBoard[i][2].getValue() === 1  
        ){
            console.log(`The winner is ${playerOneName}`)
            return true;
        } else if (
                currentBoard[i][0].getValue() === 2  && 
                currentBoard[i][1].getValue() === 2  && 
                currentBoard[i][2].getValue() === 2  
        ) {
            console.log(`The winner is ${playerTwoName}`)
            return true;
        }
        // Check all columns

       for (let j = 0; j < 3; j++){
            if (currentBoard[0][j].getValue() === 1  && 
                currentBoard[1][j].getValue() === 1  && 
                currentBoard[2][j].getValue() === 1  
        ){
            console.log(`The winner is ${playerOneName}`)
            return true;
        } else if (
                currentBoard[0][j].getValue() === 2  && 
                currentBoard[1][j].getValue() === 2  && 
                currentBoard[2][j].getValue() === 2  
        ) {
            console.log(`The winner is ${playerTwoName}`)
            return true;
        }}
        }

        // Check all diagonals
        if (    currentBoard[0][0].getValue() === 1  && 
                currentBoard[1][1].getValue() === 1  && 
                currentBoard[2][2].getValue() === 1  
        ){
             console.log(`The winner is ${playerOneName}`)
             return true;
        } else if ( 
                currentBoard[2][0].getValue() === 1  && 
                currentBoard[1][1].getValue() === 1  && 
                currentBoard[0][2].getValue() === 1  
        ) {
            console.log(`The winner is ${playerOneName}`)
            return true;
        } else if (    
                currentBoard[0][0].getValue() === 2  && 
                currentBoard[1][1].getValue() === 2  && 
                currentBoard[2][2].getValue() === 2  
        ){
             console.log(`The winner is ${playerTwoName}`)
             return true;
        } else if ( 
                currentBoard[2][0].getValue() === 2  && 
                currentBoard[1][1].getValue() === 2  && 
                currentBoard[0][2].getValue() === 2  
        ) {
            console.log(`The winner is ${playerTwoName}`)
            return true;
        } else 

        // Check for a tie
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (currentBoard[i][j].getValue() === 0){
                    //when empty cell found
                    return false;
                }
            }
        }
        console.log(`It's a tie.`)
        return true
    }


    const playRound = (row, column) => {
    //Drop a token for the current player
        
        if (board.checkAvailability(row, column) === false ){
            return false
        } else {
        board.dropToken(row, column, getActivePlayer().token);
        console.log(`Dropping ${getActivePlayer().name}'s token into row ${row}, column ${column}.`);

        // Decide on winner 
        const gameOver = checkWinner();
        if (gameOver === true) {
            console.log(`This is the end of the game. Do you want to play a new game?`)

            return true
        }

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
