const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail){
    const authenticateUser = (email, password, done) => {
        try{
            const user = getUserByEmail(email);

            if(user == null){
                return done(null, null, {message: "No user with that email"});
            }

            if(bcrypt.compareSync(password, user.password)){
                return done(null, user);
            }else{
                return done(null, null, {message: "Password invalid"});
            }
        }catch(e){
            done(e);
        }        
    }
    passport.use(new LocalStrategy(), authenticateUser);
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})
}

module.exports = initialize;