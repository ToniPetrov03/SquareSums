function Graph(n) {
  const sqrs = [];
  const graph = [];

  for (let i = 2; i * i <= n * 2 - 1; i++) sqrs.push(i * i);

  for (let i = 1; i <= n; i++) {
    const peers = [];

    for (const sqr of sqrs) {
      const peer = sqr - i;

      if (peer > 0 && peer <= n && i !== peer) peers.push(peer);
    }

    graph[i] = peers;
  }

  return graph;
}

export default function squareSumsRow(n) {
  if (n < 25 && ![1, 15, 16, 17, 23].includes(n)) return false; // no solution

  const vertices = [Array.from({ length: n }, (_, i) => i + 1)];
  const graph = Graph(n);
  const path = [];

  function dfs(vertices) {
    if (path.length === n) return path;

    vertices.sort((a, b) => graph[a].length - graph[b].length);

    for (const vertex of vertices) {
      path.push(vertex);

      graph[vertex].forEach(adj => graph[adj] = graph[adj].filter(ve => ve !== vertex));

      if (dfs(graph[vertex])) return path;

      path.pop();
      graph[vertex].forEach(adj => graph[adj].push(vertex));
    }

    return false;
  }

  return dfs(vertices);
}
