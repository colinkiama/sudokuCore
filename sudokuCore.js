// Global Variables
const SUDOKUBOARDWIDTH = 9;
const SUDOKUINNERGRIDWIDTH = 3;

usableRows = [0,1,2,3,4,5,6,7,8,9];
usableColumns = [0,1,2,3,4,5,6,7,8,9];

var unusedCells = [];
var usedCells = [];


// Classes
export default class SudokuBoard{
    
    constructor(){
      this.board = create2DArray();
      unusedCells = createUnusedCellsList();
    }

    createNewGame(){
      // Step 1: Fill up grid with numbers considering sudoku constraints
      fillBoard(this.board);
      // Step 2: Remove cells considering difficulty level.
    }
}

// Module Functions
function create2DArray()
{
    // JavaScript doesn't have a built-in way of creating
    // 2D arrays so you literally create an
    // array of arrays.
    var outerArray = new Array(SUDOKUBOARDWIDTH);
    for (let i = 0; i < outerArray.length; i++) {
      outerArray[i] = new Array(SUDOKUBOARDWIDTH);
    }

    return outerArray;
}

function createUnusedCellsList(){
    var currentIndex = 0;
    var unusedCellCoordinates = [];
    for (let i = 0; i < SUDOKUINNERGRIDWIDTH; i++) {
        for (let j = 0; j < SUDOKUINNERGRIDWIDTH; j++) {
          unusedCellCoordinates.push( {row: i, column: j} );
        }
    }

    return unusedCellCoordinates;
}

function fillBoard(boardObj){
    // Sudoku rules considered
    // 1. A row must not have repeated digits.
    // 2. A column must not have repeated digits
    // 3. Inner 3x3 regions must not have repeated digits

    
    for (let i = 0; i < boardObj.board.length; i++) {
        selectedCell = selectCellRandomly();
        var usableNums = [1,2,3,4,5,6,7,8,9];
        
        usableNums = function checkRow(){
            let rowArray = new Array(SUDOKUBOARDWIDTH);
            for (let i = 0; i < SUDOKUBOARDWIDTH; i++){
                rowArray.push(selectedCell.row, i);
            }
            return checkIfRowRepeats(rowArray, usableNums);
        }

        usableNums = function checkColumn(){
            let rowArray = new Array(SUDOKUBOARDWIDTH);
            for (let i = 0; i < SUDOKUBOARDWIDTH; i++){
                rowArray.push(i, selectedCell.column);
            }
            return checkIfRowRepeats(rowArray, usableNums);
        }
    }
    

    
}

function selectCellRandomly() {
    var cellIndex = Math.random() * Math.floor(unusedCells.length);  
    selectedCell = unusedCells[cellIndex];
    unusedCells.splice(cellIndex,1);
    return selectedCell;
}

function checkIfRowRepeats(rowToCheck, usableNumList){
    
}

function checkIfColumnRepeats(columnToCheck, usableNumList){

}

function checkIf3x3RegionRepeats(regionToCheck, usableNumList){

}

// Global Functions