function render(row, colume) {
  let resume = "<table cellpadding = '0' cellspacing ='0'>";
  for (let i = 0; i < row; i++) {
    resume += '<tr>'; // thêm hàng
    for (let j = 0; j < colume; j++) {
      resume += '<td>';
      resume += "<button id='button" + i + '_' + j + "'onclick='playerClicked(" + i + "," + j + ")'></button>";
      resume += '</td>';
    }
    resume += '</tr>';
  }
  resume += '</table>';
  return resume;
}
//console.log(render(5, 5));
function playgame() {
  let rows = document.getElementById('row').value;
  let columes = document.getElementById('colume').value;
  document.getElementById('main').innerHTML = render(rows, columes);
  console.log(rows);
}
var isXturn = true;
function playerClicked(i, j) {
  let id_buton = document.getElementById('button' + i + '_' + j).innerHTML;
  if (id_buton) return;
  // document.getElementById('button' + i + '_' + j).innerHTML = "X";
  // alert('X')
  document.getElementById('button' + i + '_' + j).innerHTML = isXturn ? 'X' : 'O';
  isXturn = !isXturn;
  // console.log(isXturn);
  let dem = 0;
  checkWinner(i, j);
}
function checkWinner(a, b) {
  let x = parseInt(a);
  let y = parseInt(b);
  var temp = '';
  for (let i = -4; i < 5; i++) {
    temp += document.querySelector('#button' + (x + i) + '_' + (y + i)) && document.querySelector('#button' + (x + i) + '_' + (y + i)).textContent ? document.querySelector('#button' + (x + i) + '_' + (y + i)).textContent : '-';
  }
  console.log('1', temp);
  check(temp);
  temp = '';
  for (let i = -4; i < 5; i++) {
    temp += document.querySelector('#button' + (x - i) + '_' + (y + i)) && document.querySelector('#button' + (x - i) + '_' + (y + i)).textContent ? document.querySelector('#button' + (x - i) + '_' + (y + i)).textContent : '-';
  }
  console.log('2', temp);
  check(temp);
  temp = '';
  for (let i = -4; i < 5; i++) {
    temp += document.querySelector('#button' + (x + i) + '_' + y) && document.querySelector('#button' + (x + i) + '_' + y).textContent ? document.querySelector('#button' + (x + i) + '_' + y).textContent : '-';
  }
  console.log('3', temp);
  check(temp);
  for (let i = -4; i < 5; i++) {
    temp += document.querySelector('#button' + x + '_' + (y + i)) && document.querySelector('#button' + x + '_' + (y + i)).textContent ? document.querySelector('#button' + x + '_' + (y + i)).textContent : '-';
  }
  console.log('4', temp);
  check(temp);
}
// checkWinner(5, 5);
function check(temp) {
  if (temp.indexOf('XXXXX') > -1) {
    alert('X won this game!');
  }

  if (temp.indexOf('OOOOO') > -1) {
    alert('O won this game!');
  }
}