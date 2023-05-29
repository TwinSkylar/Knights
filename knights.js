class ChessBoard {
  constructor() {
    this.chessBoard = new Map();
  }

  addVertices() {
    const size = 8; //standard chessboard size

    //Create all the vertices for the graph bigO(n^2)
    for (let i = 0; i < size; i++)
      for (let k = 0; k < size; k++)
        this.chessBoard.set(JSON.stringify([i, k]), []);
  }

  addEdges(board = this.chessBoared) {
    //create a table with all possible moves (x,y)
    const moves = [
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
      [-2, 1],
      [1, 2],
    ];

    for (const square of this.chessBoard.keys()) {
      const squareArray = JSON.parse(square);
      moves.forEach((moveTo) => {
        const newPositionX = squareArray[0] + moveTo[0];
        const newPositionY = squareArray[1] + moveTo[1];

        //If the square exists on the board, add the edge to it's list
        const compare = JSON.stringify([newPositionX, newPositionY]);
        if (this.chessBoard.has(compare)) {
          this.chessBoard.get(compare).push(compare);
          console.log("should be adding here");
        }
      });
    }

    //add edges using an adjacency list
  }
  print() {
    this.chessBoard.forEach((elem) => {
      console.log(elem);
    });
    /*   for (const keys of this.chessBoard.keys()) {
      console.log(keys);
    }*/
  }
}

const chessBoard = new ChessBoard();
chessBoard.addVertices();
chessBoard.addEdges();
//chessBoard.print();
