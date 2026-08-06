// Method Chaining

const numbers = [5, 10, 15, 20, 25];

const result = numbers
    .filter(number => number >= 10)
    .map(number => number * 2)
    .reduce((sum, number) => sum + number, 0);

console.log(result);