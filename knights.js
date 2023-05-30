class ChessBoard {
  constructor() {
    this.chessBoard = new Map(); //Holds a chessboard and a graph of all possible knight moves for each sqaure
  }

  /*
  Purpose:  Builds a chess board with each square a co-ordinate and and empty array for an adjacency list
  Parameters: none
  Return:  none
  */
  addVertices() {
    const size = 8; //standard chessboard size

    //Create all the vertices for the graph bigO(n^2)
    for (let i = 0; i < size; i++)
      for (let k = 0; k < size; k++)
        this.chessBoard.set(JSON.stringify([i, k]), []);
  }

  /*
  Purpose:  Fills out the adjacency list for each square
  Parameters: none
  Return:  none
  */
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
      [-1, 2],
    ];

    for (const square of this.chessBoard.keys()) {
      const squareArray = JSON.parse(square);
      moves.forEach((moveTo) => {
        const newPositionX = squareArray[0] + moveTo[0];
        const newPositionY = squareArray[1] + moveTo[1];

        //If the square exists on the board, add the edge to it's list
        const compare = JSON.stringify([newPositionX, newPositionY]);
        if (this.chessBoard.has(compare))
          this.chessBoard.get(square).push(compare);
      });
    }
  }

    /*
  Purpose:  Finds the distance and path using a knights movement
  Parameters: 
    start: the starting position of the knight
    end: the end position of the knight
  Return:  none
  */
  findPath(start, end) {
    let startKey = JSON.stringify(start);
    const endKey = JSON.stringify(end);
    const queue = [
      {
        key: startKey,
        distance: 0,
        path: [],
      },
    ];

    let currentVertice;
    while (queue.length > 0) {
      currentVertice = queue.shift();
      currentVertice.path.push(currentVertice.key);
      if (currentVertice.key === endKey) {
        break;
      }
      const list = this.chessBoard.get(currentVertice.key);
      list.forEach((neighbour) => {
        const temp = {
          key: neighbour,
          distance: currentVertice.distance + 1,
        };
        temp.path = [...currentVertice.path];
        queue.push(temp);
      });
    }
    console.log(
      `It took ${currentVertice.distance} step(s) to get from ${start} to ${end}.`
    );
    console.log(`Here are the steps:  ${currentVertice.path}`);
  }

  print() {
    console.log([...this.chessBoard.entries()]);

    console.log([...this.chessBoard.keys()]);

    console.log([...this.chessBoard.values()]);
  }
}

const chessBoard = new ChessBoard();
chessBoard.addVertices();
chessBoard.addEdges();
//chessBoard.print();
chessBoard.findPath([0, 0], [1, 2]);
chessBoard.findPath([0, 0], [3, 3]);
chessBoard.findPath([3, 3], [3, 3]);
chessBoard.findPath([3, 1], [2, 2]);
chessBoard.findPath([7, 7], [7, 6]);
