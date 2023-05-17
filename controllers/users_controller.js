const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
  User.findById(req.params.id, function(err, user){
      return res.render('user_profile', {
          title: 'User Profile',
          profile_user: user
      });
  });
}


module.exports.update = async function(req, res){
if(req.user.id == req.params.id){
    try{ 

      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req ,res, function(err){
          if(err) {console.log('****Multer Error****',err)}

          user.name = req.body.name;
          user.email =req.body.email;
          if (req.file){
            if(user.avatar){
            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
            }
          
            // this is the saving the path of the uploaded file into the avatar field in the user 
            user.avatar = User.avatarPath + '/' + req.file.filename;
          }
          user.save();
          return res.redirect('back');
      });

    }catch(err){
      req.flash('error',err);
      return res.redirect('back');
}
    

}else{
  req.flash('error', 'Unauthorize');
  return res.status(401).send('Unauthorize');
}
}


// Render the sign up page
module.exports.signUp = function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile')
  }
    return res.render('user_sign_up',{
      title:"Codial| Sign Up"
    });
}

// Render the sign in page
module.exports.signIn = function(req,res){
  if(req.isAuthenticated()){
   return res.redirect('/users/profile')
  }
  return res.render('user_sign_in',{
    title:"Codial| Sign In"
  });
}

// controller for sign Up data
module.exports.create = function(req,res){
    if (req.body.password != req.body.confirm_password){
      return res.redirect('back');
    }
  
    User.findOne({email: req.body.email}, function(err,user){
      if(err){console.log('Error is finding user in Singnin up'); return}
      if(!user){
        User.create(req.body, function(err,user){
          if(err){console.log('Error is creating user while Singnin up'); return}
          return res.redirect('/users/sign-in');
        })
      }else{
        return res.redirect('back');
      }


    });
}
// sign In and create a section for the user
module.exports.createSection = function(req,res){
// for Connect Flash 
req.flash('success','Logged in Sucessfully');
return res.redirect('/');
}





module.exports.destroySession = function(req,res){
  req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success','Logged Out Successfully');
      res.redirect('/');
    });
  };

