// import passport 
const passport = require('passport');

const  LocalStrategy = require('passport-local').Strategy;
// import user 
const User = require('../models/user');


// Authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
function(req,email,password,done){
    // find a user and establish the identity
    User.findOne({email:email},function(err,user){
        
        if(err){
            req.flash('error',err);
            return done(err);
        }
        if(!user || user.password != password){
            req.flash('error','Iinvalid username/password');
            return done(null,false);
        }
        console.log(user.id);
        return done(null,user);
    });

}
));
// Serialize the user to decide which key is ti be in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding user --> passport');
            return done(err);
        }
        return done(null,user);
    });
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res ,next){
    // if the user is signed in , then pass on the request to the next function(conroller action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the ser is not signed in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports= passport;