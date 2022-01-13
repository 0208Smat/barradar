module.exports.showAlert = (type, text) => {
    try{
        document.getElementById("alertDiv").classList.remove("hide");
        document.getElementById("alertDiv").classList.add("alert-"+type);
        document.getElementById("alertDiv").innerHTML = text;
        document.getElementById("alertDiv").focus();
    }catch(e){
        console.error("Error in showAlert: "+e);
    }
}