// Object Destructuring

const student = {
    name: "Preeti",
    age: 23,
    city: "Jaipur"
};

const { name, age } = student;

console.log(name);
console.log(age);


// Array Destructuring

const colors = ["Red", "Green", "Blue"];

const [first, second] = colors;

console.log(first);
console.log(second);