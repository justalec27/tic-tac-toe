/*
Update 6 aug: 

the last icon is always 0 instead of O or X when winning. Check the bug

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


function GameController() {

    let playerOneName = "Player One";
    let playerTwoName = "Player Two";
    
    const board = GameBoard();
    const currentBoard = board.getBoard()
    const rows = currentBoard.length;
    const columns = currentBoard[0].length

    const players = [{ name: playerOneName, token: "X"}, { name: playerTwoName, token: "O"}];

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
            if (currentBoard[i][0].getValue() === "X"  && 
                currentBoard[i][1].getValue() === "X"  && 
                currentBoard[i][2].getValue() === "X"  
        ){
            document.querySelector(".winner").textContent = `The winner is ${playerOneName}!`
            return true;
        } else if (
                currentBoard[i][0].getValue() === "O"  && 
                currentBoard[i][1].getValue() === "O"  && 
                currentBoard[i][2].getValue() === "O"  
        ) {
            document.querySelector(".winner").textContent = `The winner is ${playerTwoName}!`
            return true;
        }
        // Check all columns

       for (let j = 0; j < columns; j++){
            if (currentBoard[0][j].getValue() === "X"  && 
                currentBoard[1][j].getValue() === "X"  && 
                currentBoard[2][j].getValue() === "X"  
        ){
            document.querySelector(".winner").textContent = `The winner is ${playerOneName}!`
            return true;
        } else if (
                currentBoard[0][j].getValue() === "O"  && 
                currentBoard[1][j].getValue() === "O"  && 
                currentBoard[2][j].getValue() === "O"  
        ) {
            document.querySelector(".winner").textContent = `The winner is ${playerTwoName}!`
            return true;
        }}
        }

        // Check all diagonals
        if (    currentBoard[0][0].getValue() === "X"  && 
                currentBoard[1][1].getValue() === "X"  && 
                currentBoard[2][2].getValue() === "X"
        ){
            document.querySelector(".winner").textContent = `The winner is ${playerOneName}!`
             return true;
        } else if ( 
                currentBoard[2][0].getValue() === "X"  && 
                currentBoard[1][1].getValue() === "X"  && 
                currentBoard[0][2].getValue() === "X"  
        ) {
            document.querySelector(".winner").textContent = `The winner is ${playerOneName}!`
            return true;
        } else if (    
                currentBoard[0][0].getValue() === "O"  && 
                currentBoard[1][1].getValue() === "O"  && 
                currentBoard[2][2].getValue() === "O"  
        ){
            document.querySelector(".winner").textContent = `The winner is ${playerTwoName}!`
             return true;
        } else if ( 
                currentBoard[2][0].getValue() === "O"  && 
                currentBoard[1][1].getValue() === "O"  && 
                currentBoard[0][2].getValue() === "O"  
        ) {
            document.querySelector(".winner").textContent = `The winner is ${playerTwoName}!`
            return true;
        } else 

        // Check for a tie
        for (let i = 0; i < rows ; i++){
            for (let j = 0; j < columns; j++){
                if (currentBoard[i][j].getValue() === 0){
                    //when empty cell found
                    return false;
                }
            }
        }
        document.querySelector(".winner").textContent = `It's a tie`
        return true
    }

    function resetDisplay () {
        document.querySelector(".square1").textContent = ""
        document.querySelector(".square2").textContent = ""
        document.querySelector(".square3").textContent = ""
        document.querySelector(".square4").textContent = ""
        document.querySelector(".square5").textContent = ""
        document.querySelector(".square6").textContent = ""
        document.querySelector(".square7").textContent = ""
        document.querySelector(".square8").textContent = ""
        document.querySelector(".square9").textContent = ""

    }

     function clickNo() {
        const noButton = document.querySelector(".noBtn")
        noButton.addEventListener("click", () => {
            document.querySelector(".popup").close()
        })
    }

    function clickYes() {
        const yesButton = document.querySelector(".yesBtn")
        yesButton.addEventListener("click", () => {
            game.resetDisplay();
            board.resetBoard();
            activePlayer = players[0];
            document.querySelector(".players-turn").textContent = `It's ${activePlayer.name}'s turn`
            document.querySelector(".popup").close()


        })
    }

     function clickRestart() {
        const restartButton = document.querySelector(".restart")
        restartButton.addEventListener("click", () => {
            game.resetDisplay();
            board.resetBoard();
            activePlayer = players[0];
            document.querySelector(".players-turn").textContent = `It's ${activePlayer.name}'s turn`
        })
     }

     function clickInput() {
        const inputButton = document.querySelector(".input")
        inputButton.addEventListener("click", () => {
            document.querySelector(".userInput").showModal()

        })
     }

     function submitNames() {
        const submitNames = document.querySelector("#submitBtn")
        submitNames.addEventListener("click", (event) => {
            event.preventDefault();

            playerOneName = document.getElementById("player1Name").value;
            playerTwoName = document.getElementById("player2Name").value;

            players[0].name = playerOneName;
            players[1].name = playerTwoName;
            document.querySelector(".players-turn").textContent = `It's ${activePlayer.name}'s turn`


            document.querySelector(".userInput").close();
        })  
     }

    clickNo()
    clickYes()
    clickRestart()
    clickInput()
    submitNames()
   

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
            document.querySelector(".popup").showModal()
        
            return true
        }

        switchPlayerTurn();
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
        resetDisplay,
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


    square1.addEventListener("click", () => {
        if (square1.textContent === "") {
        square1.textContent = game.getActivePlayer().token;
        game.playRound(0,0)
 
        } else {
         alert("That move is not possible. Choose again.")
        }

    })
    
    square2.addEventListener("click", () => {
        if (square2.textContent === "") {
        square2.textContent = game.getActivePlayer().token;
        game.playRound(0,1)

        } else {
         alert("This cell is not available. Choose again.")
        }
    })

    square3.addEventListener("click", () => {
        if (square3.textContent === "") {
        square3.textContent = game.getActivePlayer().token;
        game.playRound(0,2)

        
        } else {
         alert("This cell is not available. Choose again.")
        }
    })
    square4.addEventListener("click", () => {
        if (square4.textContent === "") {
        square4.textContent = game.getActivePlayer().token;
        game.playRound(1,0)

        } else {
         alert("This cell is not available. Choose again.")
        }
    })
    square5.addEventListener("click", () => {
        if (square5.textContent === "") {
        square5.textContent = game.getActivePlayer().token;
        game.playRound(1,1)


        } else {
         alert("This cell is not available. Choose again.")
        }
    })
    square6.addEventListener("click", () => {
        if (square6.textContent === "") {
        square6.textContent = game.getActivePlayer().token;
        game.playRound(1,2)


        } else {
         alert("This cell is not available. Choose again.")
        }
    })
    square7.addEventListener("click", () => {
        if (square7.textContent === "") {
        square7.textContent = game.getActivePlayer().token;
        game.playRound(2,0)

        
        } else {
         alert("This cell is not available. Choose again.")
        }
    })
    square8.addEventListener("click", () => {
        if (square8.textContent === "") {
        square8.textContent = game.getActivePlayer().token;
        game.playRound(2,1)

        } else {
         alert("This cell is not available. Choose again.")
        }
    })
    square9.addEventListener("click", () => {
        if (square9.textContent === "") {
        square9.textContent = game.getActivePlayer().token;
        game.playRound(2,2)

        } else {
         alert("This cell is not available. Choose again.")
        }
   
    })

   

   
}

const show = renderContent();
