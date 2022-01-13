const connection = require('./connection.js');
const bcrypt = require('bcryptjs');


module.exports.processUserSignUp = (userObject) => {
    return new Promise((resolve, reject) => {
        let query = "SELECT id FROM users WHERE email = $1";
        connection.db.any(query, [userObject.email])
            .then(async (data) => {    
                if(data.length == 0){
                    console.log("user available!");
                    let myHash = bcrypt.hashSync(userObject.password, 5);
                    console.log("hash: "+myHash);
                    //insert user
                    let newUserId = await insertUser(userObject, myHash)
                        .catch((e) => {
                            throw("Error inserting user: "+e);
                        });
                    console.log("after insertUser");
                    console.log("newUserId from await: "+newUserId);
                    //open session
                    resolve(newUserId);
                }else{
                    reject("user unavailable");
                    console.log("user unavailable");
                }
            })
            .catch((error) => {
                console.error("Error in userExists: "+error);
                reject(error);
            });
      });
}

async function insertUser(userObject, hashPassword){
    //let newUserId;
    return new Promise((resolve, reject) => {
        connection.db.one('INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id', 
        [userObject.username, userObject.email, hashPassword])
        .then(data => {
            console.log("new user id: "+data.id);
            //resolve(data.id);
            resolve(data.id);
        })
        .catch(error => {
            console.error("Error in insertUser: "+error);
            reject(error);
        });
    });
    //return newUserId;
}

module.exports.getUserByEmail = async function (email){//dynamise
    return new Promise((resolve, reject) => {
        try{
            let query = "SELECT id, username, password FROM users WHERE email = $1";
            connection.db.oneOrNone(query, [email])
                .then(function(data) {
                    if(data.length == 0){
                        console.log("user not found");
                        reject(null);                        
                    }else{
                        resolve(data[0]);
                    }
                })
                .catch(function(error) {
                    console.error("error: "+error);
                    reject(error);                    
                });
        }catch(e){
            console.error("Error in getUserByEmail: "+e);
        }
      });
}