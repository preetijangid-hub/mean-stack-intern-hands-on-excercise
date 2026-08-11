// Find the sum using reduce()

const numbers = [5, 10, 15, 20];

const total = numbers.reduce((sum, number) => sum + number, 0);

console.log(total);