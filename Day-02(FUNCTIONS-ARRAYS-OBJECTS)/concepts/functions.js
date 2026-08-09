// Function Declaration

function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("Preeti"));


// Function Expression

const add = function(a, b) {
    return a + b;
};

console.log("Sum:", add(10, 20));


// Arrow Function

const square = (num) => num * num;

console.log("Square:", square(5));