// Extract product names

const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Mouse" },
    { id: 3, name: "Keyboard" }
];

const productNames = products.map(product => product.name);

console.log(productNames);