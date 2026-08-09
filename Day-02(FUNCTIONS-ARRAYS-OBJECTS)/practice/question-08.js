// Calculate total cart price

const cart = [
    { item: "Book", price: 200 },
    { item: "Pen", price: 50 },
    { item: "Bag", price: 800 }
];

const totalPrice = cart.reduce((sum, product) =>
    sum + product.price, 0
);

console.log(totalPrice);