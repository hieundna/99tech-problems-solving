export default function Problem1() {
  var sum_to_n_a = function (n: number) {
    if (typeof n !== "number" || n <= 0) {
      return 0;
    }
    return (n * (n + 1)) / 2;
  };

  var sum_to_n_b = function (n: number) {
    if (typeof n !== "number" || n <= 0) {
      return 0;
    }
    const array = Array.from({ length: n }, (_, i) => i + 1);

    return array.reduce((a, b) => a + b);
  };

  var sum_to_n_c = function (n: number) {
    if (typeof n !== "number" || n <= 0) {
      return 0;
    }
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  };
  return (
    <div>
      <p>
        <span>First way: </span>
        <span>{sum_to_n_a(255)}</span>
      </p>
      <p>
        <span>Second way: </span>
        <span>{sum_to_n_b(255)}</span>
      </p>
      <p>
        <span>Third way: </span>
        <span>{sum_to_n_c(255)}</span>
      </p>
    </div>
  );
}
