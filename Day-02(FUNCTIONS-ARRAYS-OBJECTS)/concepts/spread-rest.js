// Spread Operator

const numbers = [10, 20, 30];

const newNumbers = [...numbers, 40, 50];

console.log(newNumbers);


// Rest Operator

function total(...values) {

    return values.reduce((sum, value) => sum + value, 0);

}

console.log(total(10, 20, 30, 40));