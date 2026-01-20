export function getRandomPinCode(maxNumbers: number): string {
    const max = 10 ** maxNumbers;
    const random = Math.floor(Math.random() * max);
    return String(random).padStart(maxNumbers, "0");
}