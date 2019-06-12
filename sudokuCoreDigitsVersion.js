// Global Variables
const SUDOKUBOARDWIDTH = 9;
const SUDOKUINNERGRIDWIDTH = 3;

var digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var currentDigitCells = [];

var validCellsMap = new Map();
var invalidCellsMap = new Map();

var exceptionsList = null;

// Classes
class SudokuBoard {
  constructor() {
    this.board = create2DArray();
    this.unusedDigits = digits.slice();
    exceptionsList = create3DArray();
    fillMaps();
  }

  createNewGame() {
    // Step 1: Fill up grid with numbers considering sudoku constraints
    fillBoard.call(this);
    console.log(this.board);
    // Step 2: Remove cells considering difficulty level.
  }
}

function create3DArray(){
  var outerArray = new Array(SUDOKUBOARDWIDTH);
  for (let i = 0; i < outerArray.length; i++) {
    for (let j = 0; j < outerArray.length; j++) {
      outerArray[i][j] = []; 
    }
  }

  return outerArray;
}

function fillMaps() {
  for (let i = 0; i < SUDOKUBOARDWIDTH; i++) {
    validCellsMap[i] = [];
    invalidCellsMap[i] = [];
  }
}

function fillBoard() {
  // foreach digit, loop through rows
  this.unusedDigits.forEach(digit => {
    // For each digit you'll be able to see cells that were valid for
    // each row to avoid unnecessarily re-applying constraints
    // when backtracking

    for (let currentRow = 0; currentRow < SUDOKUBOARDWIDTH; currentRow++) {
      validCellsMap[currentRow] = getValidCellsForRow.call(this, currentRow);

      // Check if you need to backtrack
      if (!validCellsMap[currentRow].length > 0) {
        var isBacktrackingRequired = true;
        while (isBacktrackingRequired) {
          backTrack.call(this, digit, currentRow - 1);
          validCellsMap[currentRow] = getValidCellsForRow.call(
            this,
            currentRow
          );
          isBacktrackingRequired = !validCellsMap[currentRow].length > 0;
        }
      }
      var indexToUse = selectRandomInt(validCellsMap[currentRow].length);
      var cellToUse = validCellsMap[currentRow][indexToUse];
      this.board[cellToUse.row][cellToUse.column] = digit;
      currentDigitCells.push(cellToUse);
    }
    invalidCellsMap.clear();
    validCellsMap.clear();
    currentDigitCells = [];
  });
}

function backTrack(digit, backTrackRow) {
  var failedCell = currentDigitCells.pop();


  // You need to unset the cell
  this.board[failedCell.row][failedCell.column] = null;
  exceptionsList[failedCell.row][failedCell.column].push(failedCell);
  validCellsMap[backTrackRow].pop(failedCell);

  // Check if you need to backtrack
  if (!validCellsMap[backTrackRow].length > 0) {
    var isBacktrackingRequired = true;
    exceptionsList[failedCell.row][failedCell.column] = [];
    while (isBacktrackingRequired) {
      backTrack.call(this, digit, backTrackRow - 1);
      validCellsMap[backTrackRow] = getValidCellsForRow.call(
        this,
        backTrackRow
      );
      isBacktrackingRequired = !validCellsMap[backTrackRow].length > 0;
    }
  }
  var indexToUse = selectRandomInt(validCellsMap[backTrackRow].length);
  var cellToUse = validCellsMap[backTrackRow][indexToUse];
  this.board[cellToUse.row][cellToUse.column] = digit;
  currentDigitCells.push(cellToUse);
}

function selectRandomInt(upperBound) {
  return Math.floor(Math.random() * Math.floor(upperBound));
}


function getValidCellsForRow(currentRow) {
  var rowValues = this.board[currentRow];
  var cellList = [];

  for (let i = 0; i < rowValues.length; i++) {
    // 3rd constraint (cellsAlreadyFilledIn)
    if (rowValues[i] == null) {
      cellList.push({ row: currentRow, column: i });
    }
  }

  // 1st constraint (cells used previously in higher rows)
  if (currentDigitCells.length > 0) {
    cellList = cellList.filter(isNotInSameColumnAsUsedDigitCells);

    // 2nd constraint (Regions of previous cells)

    if (currentRow % SUDOKUINNERGRIDWIDTH > 0) {
      // This row isn't a new region so this constraint will apply.
      cellList = cellList.filter(isNotInSameRegionAsUsedDigitCells);
    }
  }

  var willBacktrackConstraintBeApplied = false;
  // Backtrack constraint (Is not in invalid cells)
  exceptionList[currentRow].forEach(column => {
    column.forEach(columnList => {
      if(columnList.length > 0){
        willBacktrackConstraintBeApplied = true;
        break;
      }
    });
    
  });

  if (willBacktrackConstraintBeApplied) {
    cellList = cellList.filter(isNotInInvalidCellsList, currentRow);
  }

  return cellList;
}

function isNotInInvalidCellsList(cell) {
  var currentRow = this;
  var isNotInInvalid = true;

  var currentColumnsWithExceptions = exceptionsList[currentRow];
  for (let i = 0; i < currentColumnsWithExceptions.length; i++) {
    var columnList = currentColumnsWithExceptions[i];
    for (let j = 0; j < columnList.length; j++) {
      if(columnList.includes(cell)){
        isNotInInvalid = false;
        break;
      }
      
    }
    if(isNotInInvalid == false){
      break;
    }
  }
  
  

  return isNotInInvalid;
}

function isNotInSameRegionAsUsedDigitCells(cell) {
  // Step 1: Get used cells in the current region [x]
  // Step 2: Loop through the cells in the current region
  // Step 3: Compare each cell in the current region with
  // the cell you are testing.
  var isNotInSameRegion = true;

  var currentRegionToCheck = Math.floor(currentDigitCells.length / SUDOKUINNERGRIDWIDTH);
  var startIndexToInclude = currentRegionToCheck * SUDOKUINNERGRIDWIDTH;
  var endBoundIndex = startIndexToInclude + SUDOKUINNERGRIDWIDTH;
  var usedCellsInCurrentRegion = currentDigitCells.slice(startIndexToInclude, endBoundIndex);

  for (let i = 0; i < usedCellsInCurrentRegion.length; i++) {
    if (
      Math.floor(currentDigitCells[i].column / SUDOKUINNERGRIDWIDTH) ==
      Math.floor(cell.column / SUDOKUINNERGRIDWIDTH)
    ) {
      isNotInSameRegion = false;
      break;
    }
  }
  return isNotInSameRegion;
}

function isNotInSameColumnAsUsedDigitCells(cell) {
  var isNotInSameColumn = true;
  for (let i = 0; i < currentDigitCells.length; i++) {
    if (currentDigitCells[i].column == cell.column) {
      isNotInSameColumn = false;
      break;
    }
  }
  return isNotInSameColumn;
}

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
