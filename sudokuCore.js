// Global Variables
const SUDOKUBOARDWIDTH = 9;
const SUDOKUINNERGRIDWIDTH = 3;

usableRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
usableColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var unusedCells = [];
var usedCells = [];

// Classes
class SudokuBoard {
  constructor() {
    this.board = create2DArray();
    unusedCells = createUnusedCellsList();
  }

  createNewGame() {
    // Step 1: Fill up grid with numbers considering sudoku constraints
    fillBoard.call(this);
    // Step 2: Remove cells considering difficulty level.
  }
}

// Module Functions
function create2DArray() {
  // JavaScript doesn't have a built-in way of creating
  // 2D arrays so you literally create an
  // array of arrays.
  var outerArray = new Array(SUDOKUBOARDWIDTH);
  for (let i = 0; i < outerArray.length; i++) {
    outerArray[i] = new Array(SUDOKUBOARDWIDTH);
  }

  return outerArray;
}

function createUnusedCellsList() {
  var unusedCellCoordinates = [];
  for (let i = 0; i < SUDOKUBOARDWIDTH; i++) {
    for (let j = 0; j < SUDOKUBOARDWIDTH; j++) {
      unusedCellCoordinates.push({ row: i, column: j });
    }
  }

  return unusedCellCoordinates;
}

function fillBoard() {
  // Sudoku rules considered
  // 1. A row must not have repeated digits.
  // 2. A column must not have repeated digits
  // 3. Inner 3x3 regions must not have repeated digits

  // for (let i = 0; i < SUDOKUBOARDWIDTH * SUDOKUBOARDWIDTH; i++) {
  //   var selectedCell = selectCellRandomly();
  //   console.log(selectedCell);
  //   var usableNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    
  //     usableNums = checkIfRowRepeats.call(this, selectedCell, usableNums);

  //     usableNums = checkIfColumnRepeats.call(this, selectedCell, usableNums);

  //     usableNums = checkIf3x3RegionRepeats.call(this, selectedCell, usableNums);

  //     // checkIfRowRepeats.call(this, selectedCell, usableNums);
  //     // checkIfColumnRepeats.call(this, selectedCell, usableNums);
  //     // checkIf3x3RegionRepeats.call(this, selectedCell, usableNums);

  //   var numToUse = usableNums[getRandomInt(usableNums.length)];
  //   this.board[selectedCell.row][selectedCell.column] = numToUse;
  // }

  for (let i = 0; i < SUDOKUBOARDWIDTH; i++) {
    for (let j = 0; j < SUDOKUBOARDWIDTH; j++) {
      selectedCell = {row: i, column: j};
      console.log(selectedCell);

      var usableNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    
      usableNums = checkIfRowRepeats.call(this, selectedCell, usableNums);

      usableNums = checkIfColumnRepeats.call(this, selectedCell, usableNums);

      usableNums = checkIf3x3RegionRepeats.call(this, selectedCell, usableNums);

      // checkIfRowRepeats.call(this, selectedCell, usableNums);
      // checkIfColumnRepeats.call(this, selectedCell, usableNums);
      // checkIf3x3RegionRepeats.call(this, selectedCell, usableNums);
      if (!usableNums.length > 0){
        var isBacktrackingRequired = true;
        var nextUsableIndexToBacktrackTo = 1;
        while(isBacktrackingRequired){
          usableNums = backTrack.call(this, nextUsableIndexToBacktrackTo, getLastCellFromCurrentCell(selectedCell));
          isBacktrackingRequired = usableNums.length > 0;
          nextUsableIndexToBacktrackTo++;
        }

      }
    var numToUse = usableNums[getRandomInt(usableNums.length)];
    this.board[selectedCell.row][selectedCell.column] = numToUse;

    }

  }
  console.log(this.board);
}

function getLastCellFromCurrentCell(selectedCell){
  var lastCellRow = selectedCell.row;  
  var lastCellColumn = selectedCell.column - 1;
    if(lastCellColumn < 0){
        lastCellRow = lastCellRow - 1;
        lastCellColumn = SUDOKUBOARDWIDTH - 1;
    }
  return {row: lastCellRow, column: lastCellColumn};
}

function backTrack(cell, nextUsableNumIndexToUse){
  
}

function getRandomInt(upperBound) {
  return Math.floor(Math.random() * Math.floor(upperBound));
}

function selectCellRandomly() {
  console.log("Unused Cells Length : " + unusedCells.length);
  var cellIndex = Math.floor(Math.random() * Math.floor(unusedCells.length));
  var selectedCell = unusedCells[cellIndex];
  unusedCells.splice(cellIndex, 1);
  return selectedCell;
}

function checkIfRowRepeats(selectedCell, usableNumList) {
  var rowArray = [];
  for (let i = 0; i < SUDOKUBOARDWIDTH; i++) {
    var itemToPush = this.board[selectedCell.row][i];
    if (itemToPush != null) {
      rowArray.push(itemToPush);
    }
  }
  // checkForRepeatsOnSection(rowArray, usableNumList);
  return checkForRepeatsOnSection(rowArray, usableNumList);
}

function checkIfColumnRepeats(selectedCell, usableNumList) {
  var columnArray = [];
  for (let i = 0; i < SUDOKUBOARDWIDTH; i++) {
    var itemToPush = this.board[i][selectedCell.column];
    if (itemToPush != null) {
      columnArray.push(itemToPush);
    }
  }
  // checkForRepeatsOnSection(columnArray, usableNumList);
  return checkForRepeatsOnSection(columnArray, usableNumList);
}

function checkIf3x3RegionRepeats(selectedCell, usableNumList) {
  var regionArray = [];

  // 1. get 3x3 board region coords
  // 2. get local (0,0) of 3x3 board region
  // 3. get cells in region
  // 4. add each cell to a list to check for repeats 

  var regionRow = selectedCell.row % SUDOKUINNERGRIDWIDTH;
  var regionColumn = selectedCell.column % SUDOKUINNERGRIDWIDTH;

   // You multiply by 3 so you get the local (0,0) of each grid: (3,0), (6,3) etc.
  var localOriginRow = regionRow * SUDOKUINNERGRIDWIDTH;
  var localOriginColumn = regionColumn * SUDOKUINNERGRIDWIDTH;

 
  for (let i = localOriginRow; i < localOriginRow + SUDOKUINNERGRIDWIDTH; i++) {
    for (let j = localOriginColumn; j < localOriginColumn + SUDOKUINNERGRIDWIDTH; j++) {
      var itemToPush = this.board[i][j];
      if (itemToPush != null) {
        regionArray.push(itemToPush);
      }
    }
  }

  // checkForRepeatsOnSection(regionArray, usableNumList);
  return checkForRepeatsOnSection(regionArray, usableNumList);
}

function checkForRepeatsOnSection(sectionList, usableNums) {
  // Reverse for-loop makes it easier to remove items from an array
  var startIndex = usableNums.length - 1
  for (let i = startIndex; i > -1; i--) {
    var num = usableNums[i];
    if (sectionList.includes(num)) {
      // if(usableNums.length == 1){
      //   console.log("final stand");
      // }
      usableNums.splice(i,1);
      // console.log(usableNums);
    }
  }
  return usableNums;
}
