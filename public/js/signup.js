const functions = require("./frontFunctions.js");

const form = document.getElementById("reg-form");
form.addEventListener("submit", registerUser);

async function registerUser(event){
    event.preventDefault();

    let username = document.getElementById("usernameInput").value;
    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;

    const result = await fetch("/signup.html", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    }).then((res) => res.json());

    console.log("result.result: "+result.result);//if ok then logic
    if(result.result == "ok"){
        //redirect //todo validate session
        
        
    }else if(result.result == "user unavailable"){
        functions.showAlert("warning", "Ya existe un usuario con ese nombre o correo."+ 
        " ¿Quizás querías <a href='./login.html'>ingresar</a> con tu usuario?");
    }else{
        functions.showAlert("danger", "Ocurrió un error inesperado, favor intente de nuevo más tarde.");
        console.error("Unexpected result value: "+ result.result);
    }

}

