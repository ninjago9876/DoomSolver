export function randomIntExcluding(n: number, exclude: number) {
    if (n <= 1) throw new Error("n must be at least 2 to exclude a value.");
    if (exclude < 0 || exclude >= n) throw new Error("Exclude must be in range [0, n)");
  
    const rand = Math.floor(Math.random() * (n - 1));
    return rand >= exclude ? rand + 1 : rand;
}