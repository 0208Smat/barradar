const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

function initialize(passport, getUserByEmail, getUserById){
    const authenticateUser = async (inputEmail, inputPassword, done) => {
        try{//Validate session creation
            const user = await getUserByEmail(inputEmail);
            console.log("user after getUserByEmail: "+user);

            if(user != null && await bcrypt.compare(inputPassword, user.password)){
                console.log("password ok");
                return done(null, user);
            }else{
                console.log("password invalid!");
                return done(null, false, {message: "Combinación de correo y contraseña inválida"});
            }
        }catch(e){
            return done(e);
        }        
    }
    passport.use(new LocalStrategy({usernameField: "email"}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        let user = await getUserById(id);
        return done(null, user);
    });
}

module.exports = initialize;