// import Minesweeper_puzzle from "./puzzle";

const puzzleElement = document.querySelector(".puzzle");
const levelOption = document.querySelector(".level-settings");

class Minesweeper_puzzle {
  constructor(width, height, noBomb) {
    this.puzzle = [];
    this.puzzle.length = width * height;
    this.width = width;
    this.height = height;
    this.noBomb = noBomb;
  }

  createPuzzle() {
    this.puzzle.fill(0);
    let arr = [];
    let bomb = [];
    for (let i = 0; i < this.puzzle.length; i++) {
      arr.push(i);
    }
    bomb = arr.sort(() => Math.random() - 0.5).slice(0, this.noBomb);

    for (let i = 0; i < bomb.length; i++) {
      let pos = bomb[i];
      this.puzzle[pos] = 100;
      if (pos - this.width >= 0) {
        this.puzzle[pos - this.width] += 1;
      }
      if (pos - this.width - 1 >= 0) {
        this.puzzle[pos - this.width - 1] += 1;
      }
      if (pos - this.width + 1 >= this.width) {
        this.puzzle[pos - this.width + 1] += 1;
      }

      if (pos + this.width < this.width * this.height) {
        this.puzzle[pos - this.width] += 1;
      }
      if (pos + this.width - 1 < this.width * this.height) {
        this.puzzle[pos + this.width - 1] += 1;
      }
      if (pos + this.width + 1 < this.width * this.height) {
        this.puzzle[pos + this.width + 1] += 1;
      }
    }
    console.log(this.puzzle)
    return this.puzzle;
  }
  
  getSquare(id) {
    return this.puzzle[id];
  }
}

class App {
  constructor(contextElement,puzzleElement, scoreElement){
    this.contextElement = contextElement
    this.puzzleElement = puzzleElement
    console.log(puzzleElement)
    this.scoreElement = scoreElement
  }

  start(){
    const width = 6
    const height = 6
    const noBomb = 7
    
    const puzzle = new Minesweeper_puzzle(width, height, noBomb);
    puzzle.createPuzzle()
  // Set the puzzle screen width match the level value
  this.puzzleElement.style.gridTemplateRows = `repeat(${width}, ${40 / width}rem)`;
  this.puzzleElement.style.gridTemplateColumns = `repeat(${height}, ${40 / height}rem)`;
    for (var i = 0; i < width * height; i ++) {
      let square = document.createElement('div')
      console.log(puzzle.getSquare(i))
      square.innerHTML = puzzle.getSquare(i)
      this.puzzleElement.appendChild(square)
    }
  }
}

const app = new App("hello ",puzzleElement, levelOption)
app.start()
