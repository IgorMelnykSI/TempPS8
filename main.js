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


function timerManager(player){

  if(tim1 == 0 || tim2==0){
    alert("Time Over");
  }

  if(player==="blue"){
    tim1--;
    timer1.innerText = "Timer : "+displayTime(tim1);
  }
  else{
    tim2--;
    timer2.innerText = "Opponent Timer : "+displayTime(tim2);
  }

}

function displayTime(sec){
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;

  return minutes+":"+seconds;

}





let tab = [];

for (let i = 0; i<7; i++){
	tab.push([]);
}





// Add click event listener to table cells
cells.forEach(function(cell) {
  cell.addEventListener("click", function() {
    // Find the first empty cell in the column that was clicked
    const emptyCell = findEmptyCell(cell);

    if (emptyCell) {
      // Add a piece to the empty cell
      addPiece(emptyCell, currentPlayer);
      // Check for a win
      checkForWin(currentPlayer);
      // Switch to the other player
      currentPlayer = currentPlayer === "blue" ? "yellow" : "blue";
    }
  });
});

function findEmptyCell(cell) {
  let column = cell.cellIndex;
  tab[column].push(1);
  if(tab[column].length>6) return;
  return table.rows[7 - tab[column].length -1].cells[column];
}

function addPiece(cell, player) {
  const piece = document.createElement("div");
  piece.classList.add("piece", player);
  cell.appendChild(piece);
}

function checkForWin(player) {
  // Check for horizontal win
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      if (table.rows[i].cells[j].children[0] &&
        table.rows[i].cells[j].children[0].classList.contains(player) &&
        table.rows[i].cells[j + 1].children[0] &&
        table.rows[i].cells[j + 1].children[0].classList.contains(player) &&
        table.rows[i].cells[j + 2].children[0] &&
        table.rows[i].cells[j + 2].children[0].classList.contains(player) &&
        table.rows[i].cells[j + 3].children[0] &&
        table.rows[i].cells[j + 3].children[0].classList.contains(player)) {
        alert(`Player ${player} wins!`);
        return;
      }
    }
  }

  // Check for vertical win
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 7; j++) {
      for (let j = 0; j < 4; j++) {
        if (table.rows[i].cells[j].children[0] &&
            table.rows[i].cells[j].children[0].classList.contains(player) &&
            table.rows[i + 1].cells[j].children[0] &&
            table.rows[i + 1].cells[j].children[0].classList.contains(player) &&
            table.rows[i + 2].cells[j].children[0] &&
            table.rows[i + 2].cells[j].children[0].classList.contains(player) &&
            table.rows[i + 3].cells[j].children[0] &&
            table.rows[i + 3].cells[j].children[0].classList.contains(player))
          alert(`Player ${player} wins!`);
        return;
      }
    }
  }

  // Check for diagonal win
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      if (table.rows[i].cells[j].children[0] &&
          table.rows[i].cells[j].children[0].classList.contains(player) &&
          table.rows[i + 1].cells[j + 1].children[0] &&
          table.rows[i + 1].cells[j + 1].children[0].classList.contains(player) &&
          table.rows[i + 2].cells[j + 2].children[0] &&
          table.rows[i + 2].cells[j + 2].children[0].classList.contains(player) &&
          table.rows[i + 3].cells[j + 3].children[0] &&
          table.rows[i + 3].cells[j + 3].children[0].classList.contains(player)) {
        alert(`Player ${player} wins!`);
        return;
      }
    }
  }
}