/* The PostComments class is used to handle the creation and deletion of comments on a post, as well as
the display of the comments and their associated likes. */
// Let's implement this via classes
// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    /* The `constructor` function is initializing the instance of the `PostComments` class with the
    `postId` parameter. It sets the `postId` property of the instance to the `postId` parameter, and
    then sets the `postContainer` property to the HTML element with the ID `post-` and the
    `newCommentForm` property to the HTML element with the ID `post--comments-form`.
    Finally, it calls the `createComment` method with the `postId` parameter. */
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));


               /* This code block is creating a new instance of the `ToggleLike` class for the newly
               created comment, and displaying a success message using the `Noty` library. */
                    new ToggleLike($(' .toggle-like-button', newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
    //  show the count of zero likes on this comment

       /* The `return` statement is returning a jQuery object that represents an HTML `li` element
       containing the details of a comment. The `comment` object is passed as a parameter to the
       `newCommentDom` method, and its properties are used to dynamically generate the HTML content
       of the `li` element. The `comment._id` property is used to set the `id` attribute of the `li`
       element, and is also used in the `href` attribute of the delete comment button and the toggle
       like button. The `comment.content` property is used to set the text content of the comment,
       and the `comment.user.name` property is used to display the name of the user who posted the
       comment. The `data-likes` attribute of the toggle like button is set to 0, indicating that
       the comment has not yet been liked by any user. */
        return $(`<li id="comment-${ comment._id }">
                        <p>
                            
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                            <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                    0 Likes
                                </a>
                            
                            </small>

                        </p>    

                </li>`);
    }


    /* The `deleteComment` method is used to handle the deletion of a comment. It takes a `deleteLink`
    parameter, which is a jQuery object representing the delete comment button. When the delete
    comment button is clicked, the method prevents the default behavior of the link using
    `e.preventDefault()`. It then sends an AJAX request to the server to delete the comment using
    the URL specified in the `href` attribute of the delete comment button. If the request is
    successful, the method removes the HTML element representing the deleted comment from the page
    using the `remove()` method. It also displays a success message using the `Noty` library. If
    there is an error, the method logs the error message to the console. */
    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}