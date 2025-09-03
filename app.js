let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('.reset');
let turnO = true; // true for 'O', false for 'X'
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "";
    }
};

const checkWinner = () => {
    let hasWin = false;
    for (let pattern of winPattern) {
        let [a, b, c] = pattern;
        if (
            boxes[a].innerText !== "" &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[b].innerText === boxes[c].innerText
        ) {
            hasWin = true;
            showWinner(boxes[a].innerText);
            // Highlight winning boxes
            boxes[a].style.backgroundColor = "#90ee90";
            boxes[b].style.backgroundColor = "#90ee90";
            boxes[c].style.backgroundColor = "#90ee90";
            return;
        }
    }
    // Check for Draw
    if ([...boxes].every(box => box.innerText !== "") && !hasWin) {
        msg.innerText = "Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = 'O';
                turnO = false;
            } else {
                box.innerText = 'X';
                turnO = true;
            }
            box.disabled = true;
            checkWinner();
        }
    });
});

resetButton.addEventListener('click', () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
});