const connection = require('./connection.js');
const bcrypt = require('bcryptjs');

module.exports.processUserSignUp = async function (userObject){
    return new Promise((resolve, reject) => {
        try{
            var query = "SELECT id FROM users WHERE username = $1 OR email = $2";
            connection.db.any(query, [userObject.username, userObject.email])
                .then(function(data) {
                    /* console.log("data: "+data);
                    console.log("data length: "+data.length);
                    console.log("data is null: "+data==null);
                    console.log("data is empty string: "+data=="");
                    console.log("data[0]: "+data[0]);
                    console.log("data[0].id: "+data[0].id);
                    exists = true; */
                    //opcion de usar hashSync
    
                    if(data.length == 0){
                        console.log("user available!");
                        myHash = bcrypt.hashSync(userObject.password, 2);
                        console.log("hash: "+myHash);
                        resolve("ok");
                    }else{
                        reject("user unavailable");
                        console.log("user unavailable");
                    }
                })
                .catch(function(error) {
                    reject(error);
                    console.error("error: "+error);
                });
        }catch(e){
            console.error("Error in userExists: "+e);
        }
      });
}