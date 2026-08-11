const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers
    .map(number => number * 2)
    .filter(number => number > 5)
    .reduce((sum, number) => sum + number, 0);

console.log(result);