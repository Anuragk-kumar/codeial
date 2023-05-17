const Post = require('../../../models/post');
const Comment = require('../../../models/comment');


module.exports.index = async function(req,res){


  let posts = await Post.find({})
  .sort('-createdAt')
  .populate('user')
  .populate({
    path : 'comments',
    populate: {
      path: 'user'

    }
  });
    return res.json(200,{
        message: "List of posts",
        posts: posts
    })
}

/* This code exports a function named `destory` as a property of the `module.exports` object. The
function is an asynchronous function that takes two parameters `req` and `res` which represent the
request and response objects respectively. */
module.exports.destory = async function(req,res){
   
    try{
     let post = await Post.findById(req.params.id);
     
     if(post.user == req.user.id){
         post.remove();
 
        await Comment.deleteMany({post: req.params.id});
 
 
        
        return res.json(200,{
            message: "Post and associated comments deleted this post"
        });
     }else{
         return res.json(401,{
          message: "you can not delete this post"
         });
     }
     
    }catch(err){
        console.log('*****ERROR******',err);
     return res.json(500,{
        message: "Internal Server Error"
     });
 }
    
 }