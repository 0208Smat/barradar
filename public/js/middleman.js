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

    console.log("result: "+result);
    console.log("result.result: "+result.result);//if ok then logic
    if(result.result == "ok"){
        //new profile
    }else if(result.result == "user unavailable"){
        document.getElementById("alertDiv").classList.remove("hide");
        document.getElementById("alertDiv").classList.add("alert-warning");
        document.getElementById("alertDiv").innerHTML = "Ya existe un usuario con ese nombre o correo."+ 
        " ¿Quizás querías <a href='./login.html'>ingresar</a> al sistema?";
        document.getElementById("alertDiv").focus();
    }else{
        //unexpected error
    }

}