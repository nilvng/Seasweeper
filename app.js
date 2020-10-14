// import Minesweeper_puzzle from "./puzzle";

const cardPuzzle = document.querySelector(".puzzle");
const modeOption = document.querySelector(".level-settings");

class Minesweeper_puzzle {
  constructor(width, height) {
    this.puzzle = [];
    this.puzzle.length = width * height;
    this.width = width;
    this.height = height;
  }

  createPuzzle(noBomb = (this.width * this.height) / 3) {
    this.puzzle.fill(0);
    let arr = [];
    let bomb = [];
    for (let i = 0; i < this.puzzle.length; i++) {
      arr.push(i);
    }
    bomb = arr.sort(() => Math.random() - 0.5).slice(0, noBomb);

    for (let i = 0; i < bomb.length; i++) {
      let pos = bomb[i];
      this.puzzle[pos] = 100;
      if (pos - this.width > 0) {
        this.puzzle[pos - this.width] += 1;
      }
      if (pos - this.width - 1 > 0) {
        this.puzzle[pos - this.width - 1] += 1;
      }
      if (pos - this.width + 1 > 0) {
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

    return this.puzzle;
  }

  getSquare(id) {
    return this.puzzle[id];
  }
}
const puzzle = new Minesweeper_puzzle(6, 6);
cardPuzzle.innerHTML = puzzle.createPuzzle(15);
