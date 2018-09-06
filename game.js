const Player = (token, name) => {
  let wins = 0;
  let losses = 0;
  return { token, name, wins, losses };
};

let player_one = Player("X", "Player 1");
let player_two = Player("O", "Player 2");

const renderMove = (cell) => {
  if (cell.innerHTML == '' && play.over == false) {
    if (play.turn % 2 == 1) {
      cell.innerHTML = player_one.token;
      play.board[cell.id] = player_one.token;
    } else {
      cell.innerHTML = player_two.token;
      play.board[cell.id] = player_two.token;
    }
    cell.style.backgroundColor = "white";
    checkWin();
    play.turn++;
    renderScore();
  }
};

const checkWin = () => {
  for (let i=1, j=1; i<8, j<4; i=i+3, j++) {
    let row = [play.board[i], play.board[(i+1)], play.board[(i+2)]];
    let column = [play.board[j], play.board[(j+3)], play.board[(j+6)]];
    let diagonalDown = [play.board[(i)], play.board[(i+4)], play.board[(i+8)]];
    let diagonalUp = [play.board[(i+2)], play.board[(i+4)], play.board[(i+6)]];
    if (row.every(x => x != '' && x == row[0])) {
      gameover("winner");
      break;
    } else if (column.every(x => x != '' && x == column[0])) {
      gameover("winner");
      break;
    } else if (diagonalDown.every(x => x != '' && x == diagonalDown[0])) {
      gameover("winner");
      break;
    } else if (diagonalUp.every(x => x != '' && x == diagonalUp[0])) {
      gameover("winner");
      break;
    } else if (play.turn == 9) {
      gameover("draw");
    }
  }
};

const gameover = (input) => {
  let winner = document.getElementById("winner");
  if (play.turn % 2 == 1 && input == "winner") {
    player_one.wins++;
    player_two.losses++;
    winner.innerHTML = `${player_one.name} Wins!!!`;
  } else if (input == "winner") {
    player_one.losses++;
    player_two.wins++;
    winner.innerHTML = `${player_two.name} Wins!!!`;
  } else if (input == "draw") {
    winner.innerHTML = `Draw...`;
  }
  play.over = true;
  let newGameBtn = document.createElement("BUTTON");
  newGameBtn.classList.add("new_game_btn");
  newGameBtn.innerHTML = "New Game";
  newGameBtn.onclick = newGame;
  winner.insertAdjacentElement('beforeend', newGameBtn);
};

const renderScore = () => {
  let token1 = document.getElementById("cell_0");
  token1.innerHTML = player_one.token;
  document.getElementById("cell_1").innerHTML = player_one.name;
  document.getElementById("cell_2").innerHTML = player_one.wins;
  document.getElementById("cell_3").innerHTML = player_one.losses;
  let token2 = document.getElementById("cell_4");
  token2.innerHTML = player_two.token;
  document.getElementById("cell_5").innerHTML = player_two.name;
  document.getElementById("cell_6").innerHTML = player_two.wins;
  document.getElementById("cell_7").innerHTML = player_two.losses;

  if (play.turn % 2 == 1 && play.over == false) {
    token1.style.visibility = "visible";
    token2.style.visibility = "hidden";
  } else if (play.over == false) {
    token2.style.visibility = "visible";
    token1.style.visibility = "hidden";
  }
};

const newGame = () => {
  let table = document.getElementById("gameboard");
  document.getElementById("winner").innerHTML = "";
  for(let i = table.rows.length - 1; i >= 0; i--) {
    table.deleteRow(i);
  }
  play = Game();
  renderScore();
};

const Game = () => {
  let board = {};
  let turn = 1;
  let over = false;
  let gameboard = document.getElementById("gameboard");
  for (let rows = 0; rows < 3; rows++) {
    let row = document.createElement("tr");
    for (let columns = 1; columns <= 3; columns++) {
      let cell = document.createElement("td");
      cell.className = "game_cell";
      cell.id = (3 * rows + columns).toString();
      board[cell.id] = "";
      cell.addEventListener("click", () => {renderMove(cell)});
      row.appendChild(cell);
    }
    gameboard.appendChild(row);
  }
  return { board, turn, over };
};

let play = Game();

const RenderPage = (() => {
  let scoreboard = document.getElementById("scoreboard");
  for (let rows = 0; rows < 2; rows++) {
    let row = document.createElement("tr");
    for (let columns = 0; columns < 4; columns++) {
      let cell = document.createElement("td");
      cell.className = "score_cell";
      cell.id = "cell_" + (4 * rows + columns).toString();
      row.appendChild(cell);
    }
    scoreboard.appendChild(row);
  }
  renderScore();
})();
