const findNext = (len, last, used, sqrs, n) => {
  if (len === n) return [last];

  for (let i = sqrs.length - 1; i >= 0 && sqrs[i] > last; i--) {
    const next = sqrs[i] - last;

    if (next > n || used[next]) continue;

    used[next] = true;

    const result = findNext(len + 1, next, used, sqrs, n);

    if (result) return [...result, last];

    used[next] = false;
  }

  return false;
};

export default function squareSumsRow(n) {
  const sqrs = [];
  const used = [];

  for (let i = 2; i * i <= n * 2 - 1; i++) sqrs.push(i * i);

  for (let i = n; i > 0; i--) {
    used[i] = true;

    const result = findNext(1, i, used, sqrs, n);

    if (result) return result;

    used[i] = false;
  }

  return false;
};
