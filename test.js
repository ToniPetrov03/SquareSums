function test(fn, num) {
  const t = (n) => {
    const result = fn(n);

    const { log } = console;

    if (n < 25 && ![1, 15, 16, 17, 23].includes(n)) {
      if (result !== false) {
        return log(n, 'Not false');
      }

      return log(n);
    }

    if (result?.length !== n) {
      return log(n, 'Missing');
    }

    const a = [...result].sort((a, b) => a - b);

    for (let i = 0; i < n - 1; i++) {
      if (a[i] + 1 !== a[i + 1]) {
        return log(n, 'Repeating')
      }
    }

    for (let i = 0; i < n - 1; i++) {
      const sum = result[i] + result[i + 1];
      const sqrt = Math.sqrt(sum);

      if (sqrt * sqrt !== sum) {
        return log(n, 'Not sqrt');
      }
    }

    log(n);
  }

  if (num) {
    return t(num);
  }

  for (let i = 1; i < 100000; i++) t(i);
}
