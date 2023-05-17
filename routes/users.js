const express = require('express');
const router = express.Router();


// import passport
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);
// router.post('/create-section',usersController.createSection);

//use passport as a middleware to authenticate 
 router.post('/create-section',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
    
 ),usersController.createSection);

 router.get('/sign-out', usersController.destroySession);

// for google auth
router.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSection);



module.exports = router;