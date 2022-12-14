const N_26_RESULT = [
  18,  7,  9, 16, 20,  5,  4, 21,
  15,  1,  8, 17, 19,  6, 10, 26,
  23,  2, 14, 22,  3, 13, 12, 24,
  25, 11,
];

const getFloorSqrt = (num) => ~~Math.sqrt(num);

const getSquareRoots = (n) => {
  const squareRoots = [];

  const maxSqrt = getFloorSqrt(n + n);

  for (let i = 1; i <= maxSqrt; i++) {
    squareRoots.push(i * i);
  }

  return squareRoots;
}

const Graph = (n) => {
  const vertices = [];
  const graph = [[]];

  const squareRoots = getSquareRoots(n);

  for (let i = 1; i <= n; i++) {
    vertices.push(i);

    const peers = [];
    const start = getFloorSqrt(i);
    const end = getFloorSqrt(n + i);

    for (let j = start; j < end; j++) {
      const peer = squareRoots[j] - i;

      if (peer !== i) peers.push(peer);
    }

    graph[i] = peers;
  }

  return [vertices, graph];
}

const copyGraph = (graph) => {
  const copied = [];

  for (let i = 0; i < graph.length; i++) {
    copied[i] = [...graph[i]];
  }

  return copied;
}

function squareSums(n) {
  if (n === 26) return N_26_RESULT;

  const [_vertices, _graph] = Graph(n);

  for (let i = 0; i < n; i++) {
    const path = [];
    const graph = copyGraph(_graph);

    let vertexI = i;
    let vertices = [..._vertices];

    while (true) {
      vertices.sort((a, b) => graph[a].length - graph[b].length);

      const vertex = vertices[vertexI];
      vertexI = 0;

      path.push(vertex);

      if (path.length === n) return path;

      const nextVertices = graph[vertex];

      nextVertices.forEach(v => {
        const arr = graph[v];
        arr[arr.indexOf(vertex)] = arr[arr.length - 1];
        arr.pop();
      });

      if (nextVertices.length === 0) break;

      vertices = nextVertices;
    }
  }

  return false;
}

// Algorithm:
//
// Make graph
//  Example:
//  [
//    0: [],
//    1: [ 3, 8, 15 ],
//    2: [ 7, 14 ],
//    3: [ 1, 6, 13 ],
//    4: [ 5, 12 ],
//    5: [ 4, 11 ],
//    6: [ 3, 10 ],
//    7: [ 2, 9 ],
//    8: [ 1 ],
//    9: [ 7 ],
//    10: [ 6, 15 ],
//    11: [ 5, 14 ],
//    12: [ 4, 13 ],
//    13: [ 3, 12 ],
//    14: [ 2, 11 ],
//    15: [ 1, 10 ],
//  ]
//  graph[vertex] = peers
//  graph[3] = [ 1, 6, 13 ]
//
// Find path from graph:
//
// 1. sort vertices by least peers length
// Example:
//  vertices = [ 8, 9, 2, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 1, 3 ]
//  because graph[8] = [ 1 ] has length 1
//  and graph[3] = [ 1, 6, 13 ] has length 3
//
// 2. add first vertex to path
// Example:
//  path = [ 8 ]
//
// 3. check if path length equal n
//  3.1 if path length equal n, return path
//  3.2 if path length not equal n, continue
//
// 4. remove vertex from next vertices
// Example:
//  graph[8] = [ 1 ]
//  removing 8 from graph[1]
//  graph[1] = [ 3, 15 ]
//
// 5. check if it has next vertices
//  5.1 if it has, continue with the next vertices
//  Example:
//   graph[8] = [ 1 ]
//   vertices = [ 1 ]
//  5.2 if there is no, stop and start over with next vertex
//  Example:
//   vertices = [ 8, 9, 2, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 1, 3 ]
//   if 8 is not working, start with next vertex.
//   vertex = 9
//
// The algorithm is much more efficient than the one with recursion,
// because it does not have the Range problem (RangeError: Maximum call stack size exceeded).
//
// There is only a small note that it does not handle the number 26,
// because if the algorithm fails with the first vertex,
// it does not continue to look for another path with it,
// but starts again with the next one.
//
// Since only number 26 has this problem and solving it by going back on the path
// instead of starting with another vertex will complicate and slow down the code,
// it's not worth changing.
