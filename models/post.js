const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },


    // include  the array of ids of all comment in this post itself
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
],
/* `likes` is an array of objects that contains the ids of all the likes associated with a post. Each
object in the array is of type `mongoose.Schema.Types.ObjectId` which is a unique identifier
assigned to each document stored in a MongoDB database. The `ref` property specifies the name of the
model that this object id refers to, in this case, it refers to the `Like` model. This allows us to
easily populate the likes associated with a post when we query for it. */
likes:[
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like'
}
]
},{
    timestamps:true
});


const Post = mongoose.model('Post',postSchema);
module.exports = Post;