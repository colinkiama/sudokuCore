// Global Variables
const SUDOKUBOARDWIDTH = 9;
const SUDOKUINNERGRIDWIDTH = 3;


var digits = [1,2,3,4,5,6,7,8,9];
var currentDigitCells = [];
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

function fillBoard(){
    
}