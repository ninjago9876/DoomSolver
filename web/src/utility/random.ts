export function randomIntExcluding(min: number, max: number, excluded: number): number {
    if (max - min <= 1) {
        if (excluded >= min && excluded < max) {
        throw new Error("No valid number to return; only one possible value and it's excluded.");
        }
        return min;
    }

    if (excluded < min || excluded >= max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    let rand = Math.floor(Math.random() * (max - min - 1));
    if (rand + min >= excluded) {
        rand++; // Skip excluded value
    }

    return rand + min;
}
  