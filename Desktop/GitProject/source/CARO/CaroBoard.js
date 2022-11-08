// Đầu tiên là phải tạo các biến chung (cái này chưa được dạy)
let size = 20; // Kích thước bàn cờ, có thể tạm bỏ đi
let currentP = Math.round(Math.random()); // trả về 0 và 1, đặt 0 là O, 1 là X
let inGame = false; // phải bấm Play thì mới có thể chơi được
let l_played = [],
  l_win = []; // length player và length win để test game và undo
let AI = false; // Check lại, có thể bỏ
let scoreX = 0; // Điểm số
let scoreO = 0; // Điểm số

let result = false;

// let clap = new Audio(); // Tạo nhạc vỗ tay hay hay
// clap.src = 'sound/Tieng-vo-tay-www_tiengdong_com.mp3';

// Đầu tiên là tạo table
class Table {
  size;
  constructor(size) {
    this.size = size;
  }

  drawTable() {
    // document.getElementById("imgPlayer").style.backgroundImage = "url('img/Opng.png')";

    let data = '<table>';
    for (let i = 0; i < this.size; i++) {
      data += '<tr class="row">';
      for (let j = 0; j < this.size; j++) {
        data +=
          '<td class = "col"> <div class="cell" onClick="play(id)" onMouseOver="MouseOver(id)" onMouseOut="MouseOut(id)" id="' +
          (j + i * this.size) +
          '" value="-1"></div></td>';
      }
      data += '</tr>';
    }
    data += '</table>';
    document.getElementById('table').innerHTML = data;
  }
}

// Bắt đầu làm lệnh chơi chơi nào
function play(id) {
  if (!inGame) {
    return;
  }
  let dataCel = document.getElementsByClassName('cell');
  let position = parseInt(id);

  if (dataCel.item(position).getAttribute('value') !== '-1') {
    return;
  }
  let path = "url('img/Opng.png')";
  if (currentP === 1) {
    path = "url('img/Xpng.png')";
  }
  dataCel.item(position).style.backgroundImage = path;
  dataCel.item(position).setAttribute('value', currentP.toString());
  l_played.push(position);

  if (currentP === 0) {
    currentP = 1;
  } else {
    currentP = 0;
  }
  if (currentP === 1) {
    document.getElementById('imgPlayer').style.backgroundImage =
      "url('img/Xpng.png')";
  } else if (currentP === 0) {
    document.getElementById('imgPlayer').style.backgroundImage =
      "url('img/Opng.png')";
  } else {
    document.getElementById('imgPlayer').style.backgroundImage = 'none';
  }
  if (WinGame() === true) {
    // clap.play();
    if (currentP === 1) {
      document.getElementById('kin').style.display = 'block';
      scoreO = scoreO + 1;
      document.getElementById('oScore').innerHTML = scoreO;
      document.getElementById('khang').innerHTML = 'Player "O" Win';
    } else {
      document.getElementById('kin').style.display = 'block';
      scoreX = scoreX + 1;
      document.getElementById('xScore').innerHTML = scoreX;
      document.getElementById('khang').innerHTML = 'Player "X" Win';
    }
    result = false;
    inGame = false;
  }
}

// Vẽ full Board = -1
function GetBoard() {
  var originalBoard = [];
  var sqr = document.getElementsByClassName('cell');
  for (let i = 0; i < size * size; i++)
    originalBoard.push(parseInt(sqr.item(i).getAttribute('value')));

  return originalBoard;
}

// How to win nè
function WinGame() {
  let board = GetBoard(); //Check lại xem nào
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (
        winHor(i, j, board) ||
        winVer(i, j, board) ||
        winCross1(i, j, board) ||
        winCross2(i, j, board)
      ) {
        for (let k = 0; k < l_win.length; k++) {
          document
            .getElementsByClassName('cell')
            .item(l_win[k]).style.backgroundColor = 'yellow';
          result = true;
        }
      }
    }
  }
  return result;
}

function winHor(i, j, board) {
  l_win = [];
  let count = 0;
  let player = board[j + i * size];
  if (player === -1) {
    return false;
  }
  for (let k = j; k <= j + 4; k++) {
    if (board[k + i * size] === player && board[k + i * size] !== -1) {
      count++;
      l_win.push(k + i * size);
    }
  }
  if (count >= 5) {
    return true;
  }
}

function winVer(i, j, board) {
  l_win = [];
  let count = 0;
  let player = board[j + i * size];
  if (player === -1) {
    return false;
  }
  for (let k = i; k <= i + 4; k++) {
    if (board[j + k * size] === player && board[j + k * size] !== -1) {
      count++;
      l_win.push(j + k * size);
    }
  }
  if (count >= 5) {
    return true;
  }
}

function winCross1(i, j, board) {
  l_win = [];
  let count = 0;
  let player = board[j + i * size];
  if (player === -1) {
    return false;
  }
  for (let k = 0; k <= 4; k++) {
    if (
      board[j + k + (i + k) * size] === player &&
      board[j + k + (i + k) * size] !== -1
    ) {
      count++;
      l_win.push(j + k + (i + k) * size);
    }
  }
  if (count >= 5) {
    return true;
  }
}

function winCross2(i, j, board) {
  l_win = [];
  let count = 0;
  let player = board[j + i * size];
  if (player === -1) {
    return false;
  }
  for (let k = 0; k <= 4; k++) {
    if (
      board[j - k + (i + k) * size] === player &&
      board[j - k + (i + k) * size] !== -1
    ) {
      count++;
      l_win.push(j - k + (i + k) * size);
    }
  }
  if (count >= 5) {
    return true;
  }
}

// Làm đẹp tý bằng mouseover và mouseout
function MouseOver(id) {
  if (inGame === false) {
    return;
  }
  document.getElementsByClassName('cell').item(id).style.backgroundColor =
    '#F9E79F';
}

function MouseOut(id) {
  if (inGame === false) {
    return;
  }
  document.getElementsByClassName('cell').item(id).style.backgroundColor =
    '#FFF';
}

// Các chức năng của nút nè
function Play() {
  let newGame = new Table(size);
  newGame.drawTable();
  inGame = true;
  document.getElementById('kin').style.display = 'none';
  l_played = [];
}

function Surrender() {
  alert('Ôi bạn ơi, tôi phải hành hạ bạn đến chết');
  document.getElementById('kin').style.display = 'none';
}

function Undo() {
  if (l_played.length <= 0 || WinGame() === true) {
    document.getElementById('imgPlayer').style.backgroundImage = '';
    return;
  }

  document
    .getElementsByClassName('cell')
    .item(l_played[l_played.length - 1])
    .setAttribute('value', '-1');
  document
    .getElementsByClassName('cell')
    .item(l_played[l_played.length - 1]).style.backgroundImage = '';
  l_played.pop();
  if (currentP === 0) {
    currentP = 1;
    document.getElementById('imgPlayer').style.backgroundImage =
      "url('img/Xpng.png')";
  } else {
    currentP = 0;
    document.getElementById('imgPlayer').style.backgroundImage =
      "url('img/Opng.png')";
  }
}
function playToWin(keydown) {
  switch (keydown.keyCode) {
    case 75:
      Play();
      break;
  }
}
window.addEventListener('keydown', playToWin);
let newGame = new Table(size);
newGame.drawTable();
