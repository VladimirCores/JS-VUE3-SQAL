export function utilMathRandomRange(max: number, min = 0): number {
  return Math.floor(Math.random() * (max - min) + min);
}
