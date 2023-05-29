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

  //add edges using an adjacency list
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

  findPath(start, end) {
    let startKey = JSON.stringify(start);
    const endKey = JSON.stringify(end);
    const queue = [
      {
        key: startKey,
        distance: 0,
        path:[]
      },
    ];

    let currentVertice;
    let i = 0;
    while (queue.length > 0) {
      console.log("iteration: " + i++);

      currentVertice = queue.shift();
      startKey = currentVertice.key;
      console.log ('starting new comparison: ' + startKey);
      console.log("comparing " + startKey + " and " + endKey);
      if (startKey === endKey) break;
      const list = this.chessBoard.get(currentVertice.key);
      list.forEach((neighbour) => {
        queue.push({
          key: neighbour,
          distance: currentVertice.distance + 1,
          path:path.push(startKey)
        });
        console.log("pushing on to the queue: " + neighbour);
        // console.log (queue);
      });
      if (i > 10) break;
    }
    console.log("found with a distance of " + currentVertice.distance);

    /*

    list.forEach((elem) => {
        queue.push({
            node: elem,
            distance: 1
        })
    });

   console.log(queue);*/
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
chessBoard.findPath([3, 1], [2, 2]);
chessBoard.findPath([7, 7], [7, 6]);
