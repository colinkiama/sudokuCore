// Global Variables
const SUDOKUBOARDWIDTH = 9;
const SUDOKUINNERGRIDWIDTH = 3;

usableRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
usableColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var unusedCells = [];
var usedCells = [];

// Classes
export default class SudokuBoard {
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
  var currentIndex = 0;
  var unusedCellCoordinates = [];
  for (let i = 0; i < SUDOKUINNERGRIDWIDTH; i++) {
    for (let j = 0; j < SUDOKUINNERGRIDWIDTH; j++) {
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

  for (let i = 0; i < this.board.length; i++) {
    selectedCell = selectCellRandomly();
    var usableNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    if (i > 0) {
      usableNums = checkIfRowRepeats.call(this, selectedCell, usableNums);

      usableNums = checkIfColumnRepeats.call(this, selectedCell, usableNums);

      usableNums = checkIf3x3RegionRepeats.call(this, selectedCell, usableNums);
    }
  }
}

function selectCellRandomly() {
  var cellIndex = Math.random() * Math.floor(unusedCells.length);
  selectedCell = unusedCells[cellIndex];
  unusedCells.splice(cellIndex, 1);
  return selectedCell;
}

function checkIfRowRepeats(selectedCell, usableNumList) {
  let rowArray = new Array(SUDOKUBOARDWIDTH);
  for (let i = 0; i < SUDOKUBOARDWIDTH; i++) {
    rowArray.push(this.board[(selectedCell.row, i)]);
  }

  return checkForRepeatsOnSection(rowArray, usableNums);
}

function checkIfColumnRepeats(selectedCell, usableNumList) {
  let columnArray = new Array(SUDOKUBOARDWIDTH);
  for (let i = 0; i < SUDOKUBOARDWIDTH; i++) {
    columnArray.push(this.board[(i, selectedCell.column)]);
  }
  return checkForRepeatsOnSection(columnArray, usableNums);
}

function checkIf3x3RegionRepeats(selectedCell, usableNumList) {
  let regionArray = new Array(SUDOKUBOARDWIDTH);
  // 1. locate 3x3 region of the board
  // 2. Get cells in region
  // 3. add each cell to a list to chec for repeats\
  var region = {
    row: selectedCell.row % SUDOKUINNERGRIDWIDTH,
    column: selectedCell.column % SUDOKUINNERGRIDWIDTH
  };

  for (let i = region.row; i < region.row + SUDOKUINNERGRIDWIDTH; i++) {
      for (let j = region.column; j < region.column + SUDOKUINNERGRIDWIDTH; j++) {
        regionArray.push(this.board[i,j]);
      }
      
  }

  return checkForRepeatsOnSection(regionArray, usableNums);
}

function checkForRepeatsOnSection(sectionList, usableNums) {
  
}
