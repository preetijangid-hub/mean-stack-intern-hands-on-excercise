function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}

function done() {
    console.log("Callback executed.");
}

greet("Preeti", done);