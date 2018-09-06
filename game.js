const Player = (token, name) => {
  let wins = 0;
  let losses = 0;
  return { token, name, wins, losses };
};


let player_one = Player("X", "Player 1");
let player_two = Player("O", "Player 2");
let turn = 1;

const renderMove = (cell) => {
  if (cell.innerHTML == '') {
    if (turn % 2 == 1) {
      cell.innerHTML = player_one.token;
    } else {
      cell.innerHTML = player_two.token;
    }
    cell.style.backgroundColor = "white";
    checkWin(cell);
    turn++;
  }
};

const checkWin = (cell) => {
  //   check 123,456,789,147,258,369,159,357
  
};

const Board = (() => {
  let gameboard = document.getElementById("gameboard");
  for (let rows = 0; rows < 3; rows++) {
    let row = document.createElement("tr");
    for (let columns = 1; columns <= 3; columns++) {
      let cell = document.createElement("td");
      cell.className = "game_cell";
      cell.id = (3 * rows + columns).toString();
      cell.addEventListener("click", () => {renderMove(cell)});
      row.appendChild(cell);
    }
    gameboard.appendChild(row);
  }
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
