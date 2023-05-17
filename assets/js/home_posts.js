{   
    // method to submit the form data for new post using AJAX
   /* This code defines a function `createPost` that is responsible for submitting a new post form
   using AJAX. It selects the form element with the ID `new-post-form`, prevents the default form
   submission behavior, and sends a POST request to the server at the URL `/posts/create` with the
   serialized form data. If the request is successful, it creates a new post element using the
   `newPostDom` function and prepends it to the list of posts on the page. It also attaches a click
   event listener to the delete button on the new post using the `deletePost` function. */
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
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


    // method to create a post in DOM
    let newPostDom = function(post){
        // CHANGE :: show the count of zero likes on this post
        /* This code is defining a function `newPostDom` that creates a new post element in the DOM. It
        returns a jQuery object that represents an HTML `li` element with an `id` attribute set to
        `post-${post._id}`. The `li` element contains a `p` element with the post content, user
        name, and a link to toggle likes. It also contains a `div` element with class
        `post-comments` that contains a form to add comments and a `ul` element to display comments.
        The `post._id` value is used to set various attributes and values in the HTML elements. */
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
                        </small>
                       
                        ${ post.content }
                        <br>
                        <small>
                        ${ post.user.name }
                        </small>
                        <br>
                        <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes
                                </a>
                            
                        </small>

                    </p>
                    <div class="post-comments">
                        
                            <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    }


    // method to delete a post from DOM
    /**
     * The function deletes a post using an AJAX request and displays a success message using Noty.
     * @param deleteLink - A jQuery selector for the link that triggers the deletion of a post.
     */
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
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





    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    /**
     * The function converts posts to AJAX and initializes post comments.
     */
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    /* `createPost()` is a function that submits a new post form using AJAX. It selects the form
    element with the ID `new-post-form`, prevents the default form submission behavior, and sends a
    POST request to the server at the URL `/posts/create` with the serialized form data. If the
    request is successful, it creates a new post element using the `newPostDom` function and
    prepends it to the list of posts on the page. It also attaches a click event listener to the
    delete button on the new post using the `deletePost` function. */
    createPost();
    convertPostsToAjax();
}