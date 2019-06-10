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
  var currentIndex = 0;
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

  for (let i = 0; i < SUDOKUBOARDWIDTH * SUDOKUBOARDWIDTH; i++) {
    let selectedCell = selectCellRandomly();
    let usableNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    if (i > 0) {
      // usableNums = checkIfRowRepeats.call(this, selectedCell, usableNums);

      // usableNums = checkIfColumnRepeats.call(this, selectedCell, usableNums);

      // usableNums = checkIf3x3RegionRepeats.call(this, selectedCell, usableNums);

      checkIfRowRepeats.call(this, selectedCell, usableNums);

      checkIfColumnRepeats.call(this, selectedCell, usableNums);

      checkIf3x3RegionRepeats.call(this, selectedCell, usableNums);
    }

    var numToUse = usableNums[getRandomInt(usableNums.length)];
    this.board[selectedCell.row][selectedCell.column] = numToUse;
  }
  console.log(this.board);
}

function getRandomInt(upperBound) {
  return Math.floor(Math.random() * Math.floor(upperBound));
}

function selectCellRandomly() {
  var cellIndex = Math.floor(Math.random() * Math.floor(unusedCells.length));
  var selectedCell = unusedCells[cellIndex];
  unusedCells.splice(cellIndex, 1);
  return selectedCell;
}

function checkIfRowRepeats(selectedCell, usableNumList) {
  let rowArray = [];
  for (let i = 0; i < SUDOKUBOARDWIDTH; i++) {
    var itemToPush = this.board[selectedCell.row][i];
    if (itemToPush != null) {
      rowArray.push(itemToPush);
    }
  }
  checkForRepeatsOnSection(rowArray, usableNumList);
  // return checkForRepeatsOnSection(rowArray, usableNumList);
}

function checkIfColumnRepeats(selectedCell, usableNumList) {
  let columnArray = [];
  for (let i = 0; i < SUDOKUBOARDWIDTH; i++) {
    var itemToPush = this.board[i][selectedCell.column];
    if (itemToPush != null) {
      columnArray.push(itemToPush);
    }
  }
  checkForRepeatsOnSection(columnArray, usableNumList);
  // return checkForRepeatsOnSection(columnArray, usableNumList);
}

function checkIf3x3RegionRepeats(selectedCell, usableNumList) {
  let regionArray = [];
  // 1. locate 3x3 region of the board
  // 2. Get cells in region
  // 3. add each cell to a list to chec for repeats\
  var region = {
    row: selectedCell.row % SUDOKUINNERGRIDWIDTH,
    column: selectedCell.column % SUDOKUINNERGRIDWIDTH
  };

  for (let i = region.row; i < region.row + SUDOKUINNERGRIDWIDTH; i++) {
    for (let j = region.column; j < region.column + SUDOKUINNERGRIDWIDTH; j++) {
      var itemToPush = this.board[i][j];
      if (itemToPush != null) {
        regionArray.push(itemToPush);
      }
    }
  }

  checkForRepeatsOnSection(regionArray, usableNumList);
  // return checkForRepeatsOnSection(regionArray, usableNumList);
}

function checkForRepeatsOnSection(sectionList, usableNums) {
  // Reverse for-loop makes it easier to remove items from an array
  for (let i = usableNums.length - 1; i > -1; i--) {
    var num = usableNums[i];
    if (sectionList.includes(num)) {
      usableNums.pop(num);
    }
  }
  // return usableNums;
}
