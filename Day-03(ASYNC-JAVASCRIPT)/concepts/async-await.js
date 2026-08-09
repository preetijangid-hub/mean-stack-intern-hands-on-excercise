function fetchData() {

    return new Promise(resolve => {

        setTimeout(() => {

            resolve("Data Loaded");

        },2000);

    });

}

async function getData(){

    const result = await fetchData();

    console.log(result);

}

getData();