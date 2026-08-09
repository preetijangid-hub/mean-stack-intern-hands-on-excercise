const promise1 = Promise.resolve("Task 1");

const promise2 = Promise.resolve("Task 2");

Promise.all([promise1,promise2])

.then(result=>{

console.log(result);

});