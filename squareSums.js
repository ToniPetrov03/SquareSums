function squareSumsRow(n) {
  if (n < 25 && ![1, 15, 16, 17, 23].includes(n)) return false;

  const vertices = [];
  const sqrs = [];
  const graph = [];
  const path = [];

  const s = (n * 2) ** 0.5 | 0;

  for (let i = 1; i <= n; i++) vertices.push(i);
  for (let i = 2; i <= s; i++) sqrs.push(i * i);

  for (let i = 1; i <= n; i++) {
    const peers = new Set();

    const start = i ** 0.5 - 1 | 0;
    const end = Math.min((n + i) ** 0.5 - 1 | 0, s);

    for (let j = start; j < end; j++) peers.add(sqrs[j] - i);

    peers.delete(i);

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
