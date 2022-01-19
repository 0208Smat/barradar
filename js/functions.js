const connection = require('./connection.js');
const bcrypt = require('bcryptjs');


module.exports.processUserSignUp = (userObject) => {
    return new Promise((resolve, reject) => {
        let query = "SELECT id FROM users WHERE email = $1";
        connection.db.any(query, [userObject.email])
            .then(async (data) => {    
                if(data.length == 0){
                    console.log("user available!");
                    console.log("userObject.password: "+userObject.password);
                    let myHash = await bcrypt.hash(userObject.password, 5);
                    console.log("hash: "+myHash);
                    let newUserId = await insertUser(userObject, myHash)
                        .catch((e) => {
                            throw("Error inserting user: "+e);
                        });
                    console.log("after insertUser");
                    console.log("newUserId from await: "+newUserId);
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

module.exports.getUserByEmail = async (email) => {
    //return new Promise(async (resolve, reject) => {
        try{
            console.log("param email: "+email);

            let query = "SELECT id, username, password FROM users WHERE email = $1";
            console.log("before getting queryAuxResult");
            let queryAuxResult = await executeQuery(query, [email]);

            console.log("queryAuxResult: "+queryAuxResult);
            console.log("queryAuxResult.length: "+queryAuxResult.length);
            console.log("queryAuxResult[0]: "+queryAuxResult[0]);
            console.log("queryAuxResult[0].username: "+queryAuxResult[0].username);
            return queryAuxResult[0];
        }catch{

        }
     // });
}

async function insertUser(userObject, hashPassword){
    return new Promise((resolve, reject) => {
        connection.db.one('INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id', 
        [userObject.username, userObject.email, hashPassword])
        .then(data => {
            console.log("new user id: "+data.id);
            resolve(data.id);
        })
        .catch(error => {
            console.error("Error in insertUser: "+error);
            reject(error);
        });
    });
}

async function executeQuery(query,params){//Si falla retorna undefined
    let queryResult = await connection.db.any(query, params);
    console.log("queryResult: "+queryResult);
    return queryResult;
}