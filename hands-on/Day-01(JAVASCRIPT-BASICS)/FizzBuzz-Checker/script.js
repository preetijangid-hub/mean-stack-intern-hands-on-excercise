function checkFizzBuzz(){

    const input=document.getElementById("numberInput").value;

    const result=document.getElementById("result");

    if(input===""){

        result.innerHTML="Please enter a number.";

        result.style.color="red";

        return;

    }

    const number=Number(input);

    if(number%3===0 && number%5===0){

        result.innerHTML="FizzBuzz 🎉";

        result.style.color="green";

    }

    else if(number%3===0){

        result.innerHTML="Fizz";

        result.style.color="blue";

    }

    else if(number%5===0){

        result.innerHTML="Buzz";

        result.style.color="orange";

    }

    else{

        result.innerHTML=number+" is neither Fizz nor Buzz.";

        result.style.color="black";

    }

}

function resetForm(){

    document.getElementById("numberInput").value="";

    document.getElementById("result").innerHTML="";

}