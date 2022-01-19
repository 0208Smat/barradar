if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

const express = require('express');
const functions = require("./js/functions.js");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const initializePassport = require("./js/passport-config.js");
initializePassport(passport, 
  email => {return functions.getUserByEmail(email);}
  );

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view-engine', 'ejs');

app.get('/', (req, res) => {
  res.render("index.ejs", {name: "Santiago"});
});

app.get('/login', (req, res) => {
  res.render("login.ejs");
});

app.get('/signup', (req, res) => {
  res.render("signup.ejs");
});

//post
app.post('/login', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "login",
  failureFlash: true
}));

app.post('/signup', async (req, res) => {
  await functions.processUserSignUp(req.body)
    .then((userId) => {
      console.log("New user created with id: "+userId);
      res.redirect("login");
    })
    .catch((error) => {
      console.error("Error creating user: "+error);
      res.redirect("signup");
    });
});