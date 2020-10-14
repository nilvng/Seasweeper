class Minesweeper_puzzle {
  constructor(width, height) {
    this.puzzle = [];
    this.puzzle.length = width * height;
  }

  createPuzzle(noBomb) {
    this.puzzle.length = width * height;
    this.puzzle.fill(0);
    let arr = [];
    let bomb = [];
    for (let i = 0; i < width * height; i++) {
      arr.push(i);
    }
    bomb = arr.sort(() => Math.random() - 0.5).slice(0, noBomb);

    for (let i = 0; i < bomb.length; i++) {
      let pos = bomb[i];
      this.puzzle[pos] = 100;
      if (pos - width > 0) {
        this.puzzle[pos - width] += 1;
      }
      if (pos - width - 1 > 0) {
        this.puzzle[pos - width - 1] += 1;
      }
      if (pos - width + 1 > 0) {
        this.puzzle[pos - width + 1] += 1;
      }

      if (pos + width < width * height) {
        this.puzzle[pos - width] += 1;
      }
      if (pos + width - 1 < width * height) {
        this.puzzle[pos + width - 1] += 1;
      }
      if (pos + width + 1 < width * height) {
        this.puzzle[pos + width + 1] += 1;
      }
    }

    return this.puzzle;
  }

  getSquare(id) {
    return this.puzzle[id];
  }
}
