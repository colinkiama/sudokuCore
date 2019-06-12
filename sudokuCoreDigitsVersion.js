// Global Variables
const SUDOKUBOARDWIDTH = 9;
const SUDOKUINNERGRIDWIDTH = 3;

var digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var validCellsMap = new Map();
var invalidCellsMap = new Map();
var currentDigitCellsMap = new Map();

// Classes
class SudokuBoard {
  constructor() {
    this.board = create2DArray();
    this.unusedDigits = digits.slice();
    fillMaps();
  }

  createNewGame() {
    // Step 1: Fill up grid with numbers considering sudoku constraints
    fillBoard.call(this);
    console.log(this.board);
    // Step 2: Remove cells considering difficulty level.
  }
}

function fillMaps() {
  for (let i = 0; i < SUDOKUBOARDWIDTH; i++) 
  {
    // first two maps are digits to rows with an array of cells.
    validCellsMap[digits[i]] = new Array(9);
    invalidCellsMap[digits[i]] = new Array(9);

    // this map is [digits] to array of cells
    currentDigitCellsMap[digits[i]] = []

    for (let j = 0; j < SUDOKUBOARDWIDTH; j++) {
      validCellsMap[digits[i]][j] = [];
      invalidCellsMap[digits[i]][j] = [];

    }
  }
}

function fillBoard() {
  // foreach digit, loop through rows
  this.unusedDigits.forEach(digit => {
    // For each digit you'll be able to see cells that were valid for
    // each row to avoid unnecessarily re-applying constraints
    // when backtracking

    for (let currentRow = 0; currentRow < SUDOKUBOARDWIDTH; currentRow++) {
      validCellsMap[digit][currentRow] = getValidCellsForRow.call(this, currentRow, digit);

      // Check if you need to backtrack
      if (!validCellsMap[digit][currentRow].length > 0) {
        var isBacktrackingRequired = true;

        // check if you need to go back down a digit
        if(currentRow - 1 == -1){
          // It will go down to 8 in the method parameter
          currentRow = 9;

          digit = digit - 1;

        }

        while (isBacktrackingRequired) {
          backTrack.call(this, digit, currentRow - 1);
          validCellsMap[digit][currentRow] = getValidCellsForRow.call(
            this,
            currentRow,
            digit
          );
          isBacktrackingRequired = !validCellsMap[digit][currentRow].length > 0;
        }
      }
      var indexToUse = selectRandomInt(validCellsMap[digit][currentRow].length);
      var cellToUse = validCellsMap[digit][currentRow][indexToUse];
      this.board[cellToUse.row][cellToUse.column] = digit;
      console.log(this.board);
      currentDigitCellsMap[digit].push(cellToUse);
    }
  });
}

function backTrack(digit, backTrackRow) {
  var failedCell = currentDigitCellsMap[digit].pop();

  console.log(this.board);

  // You need to unset the cell
  this.board[failedCell.row][failedCell.column] = null;
  invalidCellsMap[digit][backTrackRow].push(failedCell);
  validCellsMap[digit][backTrackRow].pop(failedCell);

  // Check if you need to backtrack
  if (!validCellsMap[digit][backTrackRow].length > 0) {
    var isBacktrackingRequired = true;
    invalidCellsMap[digit][backTrackRow] = [];

    // check if you need to go back down a digit
    if(backTrackRow - 1 == -1){
      // It will go down to 8 in the method parameter
      backTrackRow = 9;

      digit = digit - 1;

    }
    while (isBacktrackingRequired) {
      backTrack.call(this, digit, backTrackRow - 1);
      validCellsMap[digit][backTrackRow] = getValidCellsForRow.call(
        this,
        backTrackRow,
        digit
      );
      isBacktrackingRequired = !validCellsMap[digit][backTrackRow].length > 0;
    }
  }
  var indexToUse = selectRandomInt(validCellsMap[digit][backTrackRow].length);
  var cellToUse = validCellsMap[digit][backTrackRow][indexToUse];
  this.board[cellToUse.row][cellToUse.column] = digit;
  currentDigitCellsMap[digit].push(cellToUse);
}

function selectRandomInt(upperBound) {
  return Math.floor(Math.random() * Math.floor(upperBound));
}

// function shuffle(a) {
//   var j, x, i;
//   for (i = a.length - 1; i > 0; i--) {
//     j = Math.floor(Math.random() * (i + 1));
//     x = a[i];
//     a[i] = a[j];
//     a[j] = x;
//   }
//   return a;
// }

function getValidCellsForRow(currentRow, digit) {
  var rowValues = this.board[currentRow];
  var cellList = [];

  for (let i = 0; i < rowValues.length; i++) {
    // 3rd constraint (cellsAlreadyFilledIn)
    if (rowValues[i] == null) {
      cellList.push({ row: currentRow, column: i });
    }
  }

  // 1st constraint (cells used previously in higher rows)
  if (currentDigitCellsMap[digit].length > 0) {
    cellList = cellList.filter(isNotInSameColumnAsUsedDigitCells, digit);

    // 2nd constraint (Regions of previous cells)

    if (currentRow % SUDOKUINNERGRIDWIDTH > 0) {
      // This row isn't a new region so this constraint will apply.
      cellList = cellList.filter(isNotInSameRegionAsUsedDigitCells, digit);
    }
  }

  // Backtrack constraint (Is not in invalid cells)
  if (invalidCellsMap[digit][currentRow].length > 0) {
    cellList = cellList.filter(isNotInInvalidCellsList, [currentRow, digit]);
  }

  return cellList;
}

function isNotInInvalidCellsList(cell) {
  var currentRow = this[0];
  var digit = this[1];
  var isNotInInvalid = true;
  if (invalidCellsMap[digit][currentRow].includes(cell)) {
    isNotInInvalid = false;
  }
  return isNotInInvalid;
}

function isNotInSameRegionAsUsedDigitCells(cell) {
  // Step 1: Get used cells in the current region [x]
  // Step 2: Loop through the cells in the current region
  // Step 3: Compare each cell in the current region with
  // the cell you are testing.
  var isNotInSameRegion = true;
  var digit = this;
  var currentRegionToCheck = Math.floor(currentDigitCellsMap[digit].length / SUDOKUINNERGRIDWIDTH);
  var startIndexToInclude = currentRegionToCheck * SUDOKUINNERGRIDWIDTH;
  var endBoundIndex = startIndexToInclude + SUDOKUINNERGRIDWIDTH;
  var usedCellsInCurrentRegion = currentDigitCellsMap[digit].slice(startIndexToInclude, endBoundIndex);

  for (let i = 0; i < usedCellsInCurrentRegion.length; i++) {
    if (
      Math.floor(currentDigitCellsMap[digit][i].column / SUDOKUINNERGRIDWIDTH) ==
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
  var digit = this;
  for (let i = 0; i < currentDigitCellsMap[digit].length; i++) {
    if (currentDigitCellsMap[digit][i].column == cell.column) {
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
