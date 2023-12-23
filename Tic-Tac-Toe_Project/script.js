//I
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");

let msgContainer = document.querySelector(".msg-container");

let msg = document.querySelector("#msg");

//II
//playerX, playerO
let turnO = true;

//III
//2D Array
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


//XII Reset Game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    //to hide the msg and new game button after clicking on reset
    msgContainer.classList.add("hide");
}


//IV
//adding eventListener to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        //console.log("box was clicked");
        //if turnO == true then print O
        if (turnO) {
            box.innerText = "O";
            //if O is true then make false
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true
        }

        //to stop multiple times value print in same box (if (box == "null") then only we can add values) 
        //stop overriding value 
        box.disabled = true;

        //to check winner
        checkWinner();
    })
});


//VIII after winning disable the boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

//IX after winning enable boxes for new game
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        //when click on reset or newgame automatically innertext become empty
        box.innerText = "";
    }
}

//VII
//function for show winner
const showWinner = (winner) => {
    if (winner === "Draw") {
        msg.innerText = "Oops..!🤦‍♂️ It's a Draw!😅";
    } else {
        msg.innerText = `🎉Congratulations , Winner is ${winner}🥳`;
    }

    msgContainer.classList.remove("hide");
    //call a function to disable box
    disableBoxes();
}

//to check num of moves happens
let moves = 0;

//V
const checkWinner = () => {
    for (let pattern of winPatterns) {
        /*
        console.log(
            pattern[0],
            pattern[1],
            pattern[2]
        );

        console.log(
            boxes[pattern[0]].innerText,
            boxes[pattern[1]].innerText,
            boxes[pattern[2]].innerText,
        );
        */

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        //VI
        //checking no empty
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // console.log("winner", pos1Val);

                //to show the winner
                showWinner(pos1Val);
            }
        }
    }

    moves++;
    // Draw condition
    if (moves === 9) {
        showWinner("Draw");
    }
};

//XIV
//whenever user click on New Game
newGameBtn.addEventListener("click", resetGame);

//whenever user click on Reset Game
resetBtn.addEventListener("click", resetGame);

