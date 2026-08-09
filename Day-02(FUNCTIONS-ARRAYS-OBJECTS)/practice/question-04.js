// Find the largest number

const numbers = [25, 10, 80, 45, 60];

const largest = numbers.reduce((max, number) =>
    number > max ? number : max
);

console.log(largest);