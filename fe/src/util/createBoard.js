/****************************************************************************
  FileName      [ createBoard.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the pattern of mines and the board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import randomNum from "./randomFixSeed";

// eslint-disable-next-line
export default (boardSize, mineNum) => {
  let board = [];
  let mineLocations = [];

  // Print Board function (For testing)
  const printBoard = () => {
    console.log("Current Board");
    for (let x = 0; x < boardSize; x++) {
      console.log(
        board[x].map((x) => {
          return x.value !== "💣" ? x.value.toString() + " " : x.value;
        })
      );
    }
  };

  // Create a blank board
  for (let x = 0; x < boardSize; x++) {
    let subCol = [];
    for (let y = 0; y < boardSize; y++) {
      subCol.push({
        value: 0, // To store the number of mines around the cell.
        revealed: false, // To store if the cell is revealed.
        x: x, // To store the x coordinate (the column index) of the cell.
        y: y, // To store the y coordinate (the row index) of the cell.
        flagged: false, // To store if the cell is flagged.
      });
    }
    board.push(subCol);
  }

  // Random bombs locations
  let mineCount = 0;
  while (mineCount < mineNum) {
    let x = randomNum(0, boardSize - 1);
    let y = randomNum(0, boardSize - 1);

    if (board[x][y].value === 0) {
      // Check this location has not been located a mine.
      board[x][y].value = "💣"; // Change the value of the cell to '💣'
      mineLocations.push([x, y]);
      mineCount++;
    }
  }

  mineLocations.map((mine) => {
    for (let x = mine[0] - 1; x <= mine[0] + 1; x++) {
      for (let y = mine[1] - 1; y <= mine[1] + 1; y++) {
        if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
          if (board[x][y].value !== "💣") {
            board[x][y].value++;
          }
        }
      }
    }
    return mine;
  });

  return { board, mineLocations };
};
