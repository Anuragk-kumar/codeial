/* This code exports a function called `createSection` which is used to authenticate a user by checking
their email and password. It uses the `User` model to find a user with the given email and checks if
the password matches. If the authentication is successful, it returns a JSON response with a token
generated using the `jsonwebtoken` library. If there is an error, it returns a JSON response with an
error message. */
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');


module.exports.createSection = async function(req,res){

    try{
        let user = await User.findOne({email:req.body.email});

        if(!user|| user.password != req.body.password){
            return res.json(422,{
                message: "Invalid username and password"
            });
        }

        return res.json(200,{
            message:"Sign in successful ,here is your token keep it safe",
            data:{
                token: jwt.sign(user.toJSON() ,env.jwt_secret,{expiresIn:'100000'})
            }
        })

    }catch(err){
        console.log('*****ERROR******',err);
        return res.json(500,{
           message: "Internal Server Error"
        });
    }
    
    }