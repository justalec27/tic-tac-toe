/*
Update 5 aug: 

The game is working in developer. Now I need to display everything in the browser.
fix renderDisplay function()


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
        resetBoard,
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
    
    const board = GameBoard();
    const currentBoard = board.getBoard()
    const rows = currentBoard.length;
    const columns = currentBoard[0].length

    const players = [{ name: playerOneName, token: 1}, { name: playerTwoName, token: 2}];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
        activePlayer = players[1];
        } else {
        activePlayer = players[0];
        }
        document.querySelector(".players-turn").textContent = `It's ${activePlayer.name}'s turn`
    };

    const getActivePlayer = () => activePlayer

    const printNewRound = () => {
        board.printBoard();
        console.log(`It's ${getActivePlayer().name}'s turn.`)
    }

    const checkWinner = () => {
        
     
        // Check all rows

        for (let i = 0; i < rows ; i++){
            if (currentBoard[i][0].getValue() === 1  && 
                currentBoard[i][1].getValue() === 1  && 
                currentBoard[i][2].getValue() === 1  
        ){
            document.querySelector(".winner-status").textContent = `Congratulations, the winner is ${playerOneName}`
            return true;
        } else if (
                currentBoard[i][0].getValue() === 2  && 
                currentBoard[i][1].getValue() === 2  && 
                currentBoard[i][2].getValue() === 2  
        ) {
            document.querySelector(".winner-status").textContent = `Congratulations, the winner is ${playerTwoName}`
            return true;
        }
        // Check all columns

       for (let j = 0; j < columns; j++){
            if (currentBoard[0][j].getValue() === 1  && 
                currentBoard[1][j].getValue() === 1  && 
                currentBoard[2][j].getValue() === 1  
        ){
            document.querySelector(".winner-status").textContent = `Congratulations, the winner is ${playerOneName}`
            return true;
        } else if (
                currentBoard[0][j].getValue() === 2  && 
                currentBoard[1][j].getValue() === 2  && 
                currentBoard[2][j].getValue() === 2  
        ) {
            document.querySelector(".winner-status").textContent = `Congratulations, the winner is ${playerTwoName}`
            return true;
        }}
        }

        // Check all diagonals
        if (    currentBoard[0][0].getValue() === 1  && 
                currentBoard[1][1].getValue() === 1  && 
                currentBoard[2][2].getValue() === 1  
        ){
             document.querySelector(".winner-status").textContent = `Congratulations, the winner is ${playerOneName}`
             return true;
        } else if ( 
                currentBoard[2][0].getValue() === 1  && 
                currentBoard[1][1].getValue() === 1  && 
                currentBoard[0][2].getValue() === 1  
        ) {
           document.querySelector(".winner-status").textContent = `Congratulations, the winner is ${playerOneName}`
            return true;
        } else if (    
                currentBoard[0][0].getValue() === 2  && 
                currentBoard[1][1].getValue() === 2  && 
                currentBoard[2][2].getValue() === 2  
        ){
             document.querySelector(".winner-status").textContent = `Congratulations, the winner is ${playerTwoName}`
             return true;
        } else if ( 
                currentBoard[2][0].getValue() === 2  && 
                currentBoard[1][1].getValue() === 2  && 
                currentBoard[0][2].getValue() === 2  
        ) {
            document.querySelector(".winner-status").textContent = `Congratulations, the winner is ${playerTwoName}`
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
        document.querySelector(".winner-status").textContent = `It's a tie`
        return true
    }

    function resetDisplay () {
        document.querySelector(".square1").textContent = currentBoard[0][0].getValue();
        document.querySelector(".square2").textContent = currentBoard[0][1].getValue();
        document.querySelector(".square3").textContent = currentBoard[0][2].getValue();
        document.querySelector(".square4").textContent = currentBoard[1][0].getValue();
        document.querySelector(".square5").textContent = currentBoard[1][1].getValue();
        document.querySelector(".square6").textContent = currentBoard[1][2].getValue();
        document.querySelector(".square7").textContent = currentBoard[2][0].getValue();
        document.querySelector(".square8").textContent = currentBoard[2][1].getValue();
        document.querySelector(".square9").textContent = currentBoard[2][2].getValue();

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
            board.resetBoard();
            activePlayer = players[0];
            printNewRound();
            // resetDisplay()
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
        switchPlayerTurn,
        getActivePlayer,
        playRound,
        printNewRound,
        getBoard: board.getBoard,
        printBoard: board.printBoard,
        checkWinner,
    }
}

const game = GameController();

function renderContent() {

    const currentBoard = game.getBoard();
    const gameOver = game.checkWinner();

    const square1 = document.querySelector(".square1");
    const square2 = document.querySelector(".square2");
    const square3 = document.querySelector(".square3 ");
    const square4 = document.querySelector(".square4");
    const square5 = document.querySelector(".square5");
    const square6 = document.querySelector(".square6");
    const square7 = document.querySelector(".square7");
    const square8 = document.querySelector(".square8");
    const square9 = document.querySelector(".square9");


    square1.textContent = currentBoard[0][0].getValue();
    square1.addEventListener("click", () => {
        if (square1.textContent === "0") {
        square1.textContent = game.getActivePlayer().token;
        game.playRound(0,0)
 
        } else {
         alert("This cell is not available. Choose again.")
        }

    })
    square2.textContent = currentBoard[0][1].getValue();
    square2.addEventListener("click", () => {
        if (square2.textContent === "0") {
        square2.textContent = game.getActivePlayer().token;
        game.playRound(0,1)

        } else {
         alert("This cell is not available. Choose again.")
        }
    })

    square3.textContent = currentBoard[0][2].getValue();
    square3.addEventListener("click", () => {
        if (square3.textContent === "0") {
        square3.textContent = game.getActivePlayer().token;
        game.playRound(0,2)
        
        } else {
         alert("This cell is not available. Choose again.")
        }
    })
    square4.textContent = currentBoard[1][0].getValue();
    square4.addEventListener("click", () => {
        if (square4.textContent === "0") {
        square4.textContent = game.getActivePlayer().token;
        game.playRound(1,0)
        } else {
         alert("This cell is not available. Choose again.")
        }
    })
    square5.textContent = currentBoard[1][1].getValue();
    square5.addEventListener("click", () => {
        if (square5.textContent === "0") {
        square5.textContent = game.getActivePlayer().token;
        game.playRound(1,1)

        } else {
         alert("This cell is not available. Choose again.")
        }
    })
    square6.textContent = currentBoard[1][2].getValue();
    square6.addEventListener("click", () => {
        if (square6.textContent === "0") {
        square6.textContent = game.getActivePlayer().token;
        game.playRound(1,2)

        } else {
         alert("This cell is not available. Choose again.")
        }
    })
    square7.textContent = currentBoard[2][0].getValue();
    square7.addEventListener("click", () => {
        if (square7.textContent === "0") {
        square7.textContent = game.getActivePlayer().token;
        game.playRound(2,0)
        
        } else {
         alert("This cell is not available. Choose again.")
        }
    })
    square8.textContent = currentBoard[2][1].getValue();
    square8.addEventListener("click", () => {
        if (square8.textContent === "0") {
        square8.textContent = game.getActivePlayer().token;
        game.playRound(2,1)
        } else {
         alert("This cell is not available. Choose again.")
        }
    })
    square9.textContent = currentBoard[2][2].getValue();
    square9.addEventListener("click", () => {
        if (square9.textContent === "0") {
        square9.textContent = game.getActivePlayer().token;
        game.playRound(2,2)
        } else {
         alert("This cell is not available. Choose again.")
        }
   
    })

  

    return {
    }
}

const show = renderContent();
