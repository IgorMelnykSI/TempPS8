const table = document.querySelector("table");
const cells = document.querySelectorAll("td");
let currentPlayer = "blue";

let timer1 = document.getElementById("ourTimer");
let timer2 = document.getElementById("oppTimer");

let tim1 = 300;
let tim2 = 300;


setInterval(() => {
    timerManager(currentPlayer);
}, 1000);


function timerManager(player) {

    if (tim1 === 0 || tim2 === 0) {
        alert("Time Over");
    }

    if (player === "blue") {
        tim1--;
        timer1.innerText = "Timer : " + displayTime(tim1);
    } else {
        tim2--;
        timer2.innerText = "Opponent Timer : " + displayTime(tim2);
    }

}

function displayTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return minutes + ":" + seconds;
}


let tab = [];

for (let i = 0; i < 7; i++) {
    tab.push([]);
}


// Add click event listener to table cells
cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
        // Find the first empty cell in the column that was clicked
        const emptyCell = findEmptyCell(cell);

        if (emptyCell) {
            // Add a piece to the empty cell
            addPiece(emptyCell, currentPlayer);
            // Check for a win
            //checkForWin(currentPlayer);
            checkCell(emptyCell, currentPlayer);
            // Switch to the other player
            currentPlayer = currentPlayer === "blue" ? "yellow" : "blue";
        }
    });
});

function findEmptyCell(cell) {
    let column = cell.cellIndex;
    let currentColor = currentPlayer === "blue" ? 1 : 0;
    tab[column].push(currentColor);
    if (tab[column].length > 6) return;
    return table.rows[7 - tab[column].length - 1].cells[column];
}

function addPiece(cell, player) {
    cell.classList.add(player);
}

function checkCell(cell, player) {

    let column = cell.cellIndex;
    let line = tab[column].length - 1;
    let currentCell = tab[column][line]; // 1 or 0

    // horizontal
    let sumLeft = 0;
    for (let i = 1; i < 4; i++) {
        let index = column - i;
        if (index > -1 && currentCell === tab[index][line]) {
            sumLeft += 1;
        } else {
            break;
        }
    }

    let sumRight = 0;
    for (let i = 1; i < 4; i++) {
        let index = column + i;
        if (index < 7 && currentCell === tab[index][line]) {
            sumLeft += 1;
        } else {
            break;
        }
    }

    if ((sumLeft + sumRight) >= 3) {
        alert(`Player ${player} wins!`);
        return;
    }

    // vertical
    let bottomSum = 0;
    for (let i = 1; i < 4; i++) {
        let index = line - i;
        if (index > -1 && currentCell === tab[column][index]) {
            bottomSum += 1;
        } else {
            break;
        }
    }

    if (bottomSum === 3) {
        alert(`Player ${player} wins!`);
        return;
    }

    // diagonal
    let sumUpRight = 0;
    for (let i = 1; i < 4; i++) {
        let indexLine = line + i;
        let indexColumn = column + i;
        if (indexLine < 6 && indexColumn < 7 && currentCell === tab[indexColumn][indexLine]) {
            sumUpRight += 1;
        } else {
            break;
        }
    }

    let sumDownLeft = 0;
    for (let i = 1; i < 4; i++) {
        let indexLine = line - i;
        let indexColumn = column - i;
        if (indexLine > -1 && indexColumn > -1 && currentCell === tab[indexColumn][indexLine]) {
            sumDownLeft += 1;
        } else {
            break;
        }
    }

    if ( (sumUpRight + sumDownLeft) >= 3) {alert(`Player ${player} wins!`); return;}

    let sumUpLeft = 0;
    for (let i = 1; i < 4; i++) {
        let indexLine = line + i;
        let indexColumn = column - i;
        if (indexLine < 6 && indexColumn > -1 && currentCell === tab[indexColumn][indexLine]) {
            sumUpLeft += 1;
        } else {
            break;
        }
    }

    let sumDownRight = 0;
    for (let i = 1; i < 4; i++) {
        let indexLine = line - i;
        let indexColumn = column + i;
        if (indexLine > -1 && indexColumn < 7 && currentCell === tab[indexColumn][indexLine]) {
            sumDownRight += 1;
        } else {
            break;
        }
    }

    if ( (sumUpLeft + sumDownRight) >= 3) {alert(`Player ${player} wins!`);}
}

function checkForWin(player) {
    // Check for horizontal win
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (table.rows[i].cells[j].children[0] && table.rows[i].cells[j].children[0].classList.contains(player) && table.rows[i].cells[j + 1].children[0] && table.rows[i].cells[j + 1].children[0].classList.contains(player) && table.rows[i].cells[j + 2].children[0] && table.rows[i].cells[j + 2].children[0].classList.contains(player) && table.rows[i].cells[j + 3].children[0] && table.rows[i].cells[j + 3].children[0].classList.contains(player)) {
                alert(`Player ${player} wins!`);
                return;
            }
        }
    }

    // Check for vertical win
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 7; j++) {
            if (table.rows[i].cells[j].children[0] && table.rows[i].cells[j].children[0].classList.contains(player) && table.rows[i + 1].cells[j].children[0] && table.rows[i + 1].cells[j].children[0].classList.contains(player) && table.rows[i + 2].cells[j].children[0] && table.rows[i + 2].cells[j].children[0].classList.contains(player) && table.rows[i + 3].cells[j].children[0] && table.rows[i + 3].cells[j].children[0].classList.contains(player)) alert(`Player ${player} wins!`);
        }
    }

    // Check for diagonal win
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (table.rows[i].cells[j].children[0] && table.rows[i].cells[j].children[0].classList.contains(player) && table.rows[i + 1].cells[j + 1].children[0] && table.rows[i + 1].cells[j + 1].children[0].classList.contains(player) && table.rows[i + 2].cells[j + 2].children[0] && table.rows[i + 2].cells[j + 2].children[0].classList.contains(player) && table.rows[i + 3].cells[j + 3].children[0] && table.rows[i + 3].cells[j + 3].children[0].classList.contains(player)) {
                alert(`Player ${player} wins!`);
                return;
            }
        }
    }
}

