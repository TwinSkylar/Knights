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
        path: [],
      },
    ];

    let currentVertice;
    let i = 0;
    while (queue.length > 0) {
      console.log("iteration: " + i++);
      currentVertice = queue.shift();
      currentVertice.path.push(currentVertice.key);
      console.log("The path to this node is: " + currentVertice.path);
      console.log("comparing " + currentVertice.key + " and " + endKey);
      if (currentVertice.key === endKey) {
        console.log("wtf");
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
      console.log ('closing with a queue of: ' + queue.length);
    }
    console.log(
      "** found with a distance of " + currentVertice.distance + " ****"
    );
    console.log("here is the path:  " + currentVertice.path);

    /*
    Check the top node for a match
    while the queue is not empty
    grab the first node on the queue
    check if it is a match
    if not a match push all it's children
      each children should increase it's distance by one
      each children adopt the path of it's parent
      add the path of itself
   */
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
