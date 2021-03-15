function squareSumsRow(n) {
  if (n < 25 && ![1, 15, 16, 17, 23].includes(n)) return false;

  const vertices = Array.from({ length: n }, (_, i) => i + 1);
  const sqrs = [];
  const graph = [];
  const path = [];

  for (let i = 2; i * i <= n * 2 - 1; i++) sqrs.push(i * i);

  for (let i = 1; i <= n; i++) {
    const peers = new Set();

    for (const sqr of sqrs) {
      const peer = sqr - i;

      if (peer > 0 && peer <= n && peer !== i) peers.add(peer);
    }

    graph[i] = peers;
  }

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

  return dfs(vertices);
}
