function Graph(n) {
  const { sqrt, min } = Math;

  const sqrs = [];
  const graph = [];

  const numSqrs = ~~(sqrt(n + n));

  for (let i = 2; i <= numSqrs; i++) sqrs.push(i * i);

  for (let i = 1; i <= n; i++) {
    const peers = new Set();

    const start = ~~(sqrt(i)) - 1;
    const end = min(~~(sqrt(n + i)) - 1, numSqrs);

    for (let j = start; j < end; j++) {
      const peer = sqrs[j] - i;

      if (peer !== i) peers.add(peer);
    }

    graph[i] = peers;
  }

  return graph;
}

function squareSumsRow(n) {
  if (n < 25 && ![1, 15, 16, 17, 23].includes(n)) return false;

  const graph = Graph(n);
  const path = [];

  function dfs(vertices) {
    if (path.length === n) return path;

    vertices.sort((a, b) => graph[a].size - graph[b].size);

    for (const vertex of vertices) {
      path.push(vertex);

      graph[vertex].forEach(adj => graph[adj].delete(vertex));

      if (dfs([...graph[vertex]])) return path;

      path.pop();

      graph[vertex].forEach(adj => graph[adj].add(vertex));
    }

    return false;
  }

  return dfs(Array.from({ length: n }, (_, i) => i + 1));
}
