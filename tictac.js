$(document).ready(function () {
  "use strict";
  resetGame();
  $("#tictac td").click(moveAt);
  $("#tictacreset").click(resetGame);
});

function resetGame() {
  "use strict";
  var target;
  $("#tictac td").text('');
  target = $("#result");
  target.css('color', '#000');
  target.text("Click a Squire");
}


function checkWin(board) {
  "use strict";

  return checkRow(board[0], board[1], board[2])
	+checkRow(board[3], board[4], board[5])
	+checkRow(board[6], board[7], board[8])
	+checkRow(board[0], board[3], board[6])
	+checkRow(board[1], board[4], board[7])
	+checkRow(board[2], board[5], board[8])
	+checkRow(board[0], board[4], board[8])
	+checkRow(board[2], board[4], board[6]);
}


function fetchBoard() {
  "use strict";

  var board;
  board = ['', '', '', '', '', '', '', '', ''];
  $("#tictac td").each(function(index) {
    board[index] = $(this).text();
  });
  return board;
}

function checkRow(a, b, c) {
  "use strict";
  
  if (a === 'X' && b === 'X' && c === 'X') {
    return 1;
  } else if (a === 'O' && b === 'O' && c == 'O') {
    return -1;
  } else {
    return 0;
  }
}


function showGameOver(result) {
  "use strict";
  
  var target;
  target = $("#result");
  if (result > 0) {
    target.css('color', '#800');
    target.text("You Win!");
  } else if (result < 0) {
    target.css('color', '#008');
    target.text("I Win!");
  } else {
    target.css('color', '#505');
    target.text("Tie Game.");
  }
  
}


function selectMove(board) {
  "use strict";

  var i, options;
  options = [];
  for (i = 0; i < 9; i += 1) {
    if (board[i]  === '') {
      options.push(i);
    }
  }
  if (options.length === '0') {
    return -1;
  } else {
    return options[Math.floor(Math.random() * options.length)];

  }
}


function moveAt() {
  "use strict";
  var xCell, board, result, oLocation, oCell;
 
  xCell = $(this);
  
  if (xCell.text() !== '' || checkWin(fetchBoard()) !== 0) {
    return;
  }

  xCell.css('color', '#800');
  xCell.text('X');

  board = fetchBoard();
  result = checkWin(board);
  if (result !== 0) {
    showGameOver(result);
    return;
  }

  oLocation = selectMove(board);
  if (oLocation < 0 ) {
    showGameOver(0);
    return;
  }
  
  board[oLocation] = 'O';
  oCell = $("#cell" + oLocation);
  oCell.css('color', '#008');
  oCell.text('O');

  result = checkWin(board);
  if (result !== '0') {
    showGameOver(result);
    return;
  }
}

