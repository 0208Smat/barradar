const express = require('express');
const bodyParser = require('body-parser');

//My requirements
const functions = require("./js/functions.js");
//const functions = import('./js/functions.js');

// //postgresql
// const pgp = require('pg-promise')();
// const db = pgp('postgres://admin:smat2022@localhost:5432/barradarbackend');


const app = express();
const port = 3000;

app.use(express.static('public'))
//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//GET REQUESTS
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//POST REQUESTS
app.post('/signup.html', async (req, res) => {
    console.log("req.body: "+req.body);
    console.log("User to insert: "+req.body.username);//see log
    //validate if users already exists
    console.log("log before await");
    let result = await functions.processUserSignUp(req.body).catch((error) => {return error});
    console.log("result: "+result);
    console.log("log after await");

    //to answer
    res.json({result: result});
    /* functions.processUserSignUp(req.body).then( (res) => {
      console.log("user ok from main!");
    }).catch((rej) => {
      console.log("user not ok from main!");
    }); */
    
    // if(functions.userExists(req.body)){
    //   console.log("user or email already exists!"); //showalert  
    // }else{
    //   console.log("user available!");
    // }

    //TODO hash password before insert!

    /* db.one('INSERT INTO users(username, email, password) VALUES($1, $2) RETURNING id', ['John', true])
        .then(data => {
            console.log(data.id); // print new user id;
    })
        .catch(error => {
            console.log('ERROR:', error); // print error;
    }); */
});