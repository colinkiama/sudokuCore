// Global Variables
const SUDOKUBOARDWIDTH = 9;
const SUDOKUINNERGRIDWIDTH = 3;

var digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var currentDigitCells = [];
// Classes
class SudokuBoard {
  constructor() {
    this.board = create2DArray();
    this.unusedDigits = digits.slice();
  }

  createNewGame() {
    // Step 1: Fill up grid with numbers considering sudoku constraints
    fillBoard.call(this);
    // Step 2: Remove cells considering difficulty level.
  }
}

function fillBoard() {
  // foreach digit, loop through rows
  this.unusedDigits.forEach(digit => {
    // For each digit you'll be able to see cells that were valid for
    // each row to avoid unnecessarily re-applying constraints
    // when backtracking
    var validCellsRowMap = new Map();
    for (let currentRow = 0; currentRow < SUDOKUBOARDWIDTH; currentRow++) {
      validCellsRowMap[currentRow] = getValidCellsForRow.call(this, currentRow);
    }
  });
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
    // Tip (use modulus '%' to figure out if cell is in same region)

    if (cell.row % SUDOKUINNERGRIDWIDTH > 0) {
      // This row isn't a new region so this constraint will apply.
      cellList = cellList.filter(isNotInSameRegionAsUsedDigitCells);
    }
  }
}

function isNotInSameRegionAsUsedDigitCells(cell) {
  var isNotInSameRegion = true;
  for (let i = 0; i < currentDigitCells.length; i++) {
    if ((currentDigitCells[i].column % SUDOKUINNERGRIDWIDTH == 
      cell.column % SUDOKUINNERGRIDWIDTH)) {
        isNotInSameRegion = false;
      break;
    }
  }
  return isNotInSameColumnAsUsedDigitCells;
}

function isNotInSameColumnAsUsedDigitCells(cell) {
  var isNotInSameColumn = true;
  for (let i = 0; i < currentDigitCells.length; i++) {
    if ((currentDigitCells[i].column = cell.column)) {
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
