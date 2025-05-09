export function randomIntExcluding(min: number, max: number, excluded: number) {
    if (max - min <= 1) {
      return min
    }
  
    if (excluded < min || excluded >= max) {
      // If the excluded number isn't in range, return any number in range
      return Math.floor(Math.random() * (max - min)) + min;
    }
  
    let rand = Math.floor(Math.random() * (max - min - 1));
    if (rand + min >= excluded) {
      rand++; // Skip the excluded number
    }
  
    return rand + min;
  }