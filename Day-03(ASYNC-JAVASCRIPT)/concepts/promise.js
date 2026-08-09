const promise = new Promise((resolve, reject) => {

    let success = true;

    if (success) {
        resolve("Promise Resolved");
    } else {
        reject("Promise Rejected");
    }

});

promise
.then(result => console.log(result))
.catch(error => console.log(error));