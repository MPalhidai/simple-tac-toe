const Player = (token, name) => {
  let wins = 0;
  let losses = 0;
  return { token, name, wins, losses };
};


let player_one = Player("X", "Player 1");
let player_two = Player("O", "Player 2");

const renderMove = (cell) => {
  if (cell.innerHTML == '' && Game.over == false) {
    if (Game.turn % 2 == 1) {
      cell.innerHTML = player_one.token;
      Game.board[cell.id] = player_one.token;
    } else {
      cell.innerHTML = player_two.token;
      Game.board[cell.id] = player_two.token;
    }
    cell.style.backgroundColor = "white";
    checkWin();
    Game.turn++;
  }
};

const checkWin = () => {
  for (let i=1, j=1; i<8, j<4; i=i+3, j++) {
    let row = [Game.board[i.toString()], Game.board[(i+1).toString()], Game.board[(i+2).toString()]];
    let column = [Game.board[j.toString()], Game.board[(j+3).toString()], Game.board[(j+6).toString()]];
    let diagonalDown = [Game.board[(i).toString()], Game.board[(i+4).toString()], Game.board[(i+8).toString()]];
    let diagonalUp = [Game.board[(i+2).toString()], Game.board[(i+4).toString()], Game.board[(i+6).toString()]];
    if (row.every(x => x != '' && x == row[0])) {
      winner();
    } else if (column.every(x => x != '' && x == column[0])) {
      winner();
    } else if (diagonalDown.every(x => x != '' && x == diagonalDown[0])) {
      winner();
    } else if (diagonalUp.every(x => x != '' && x == diagonalUp[0])) {
      winner();
    } else if (Game.turn == 9) {
      winner();
    }
  }
};

const winner = () => {
  if (Game.turn == 9) {
    document.getElementById("winner").innerHTML = `Draw...`;
  } else if (Game.turn % 2 == 1) {
    player_one.wins++;
    player_two.losses++;
    document.getElementById("winner").innerHTML = `${player_one.name} Wins!!!`;
  } else {
    player_one.losses++;
    player_two.wins++;
    document.getElementById("winner").innerHTML = `${player_two.name} Wins!!!`;
  }
  Game.over = true;
};

const Game = (() => {
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
  return { board, turn, over }
})();

const ScoreBoard = (() => {
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
})();

const renderScore = (() => {
  document.getElementById("cell_0").innerHTML = player_one.token;
  document.getElementById("cell_1").innerHTML = player_one.name;
  document.getElementById("cell_2").innerHTML = player_one.wins;
  document.getElementById("cell_3").innerHTML = player_one.losses;
  document.getElementById("cell_4").innerHTML = player_two.token;
  document.getElementById("cell_5").innerHTML = player_two.name;
  document.getElementById("cell_6").innerHTML = player_two.wins;
  document.getElementById("cell_7").innerHTML = player_two.losses;
})();
