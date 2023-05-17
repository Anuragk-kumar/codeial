
/* This is a class definition in JavaScript that creates an object called `ToggleLike`. The
`constructor` method takes in a parameter `toggleElement` and assigns it to the property
`this.toggler`. It then calls the `toggleLike()` method which attaches a click event listener to the
`toggleElement`. When the element is clicked, an AJAX request is sent to the server to toggle the
like status of the item. The response from the server is used to update the like count displayed on
the page. */
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            /* This code is sending an AJAX POST request to the server using jQuery's `$.ajax()`
            method. The request is being sent to the URL specified in the `href` attribute of the
            `toggleElement` that was clicked. */
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    
                }else{
                    likesCount += 1;
                }


                $(self).attr('data-likes', likesCount);
                $(self).html(`${likesCount} Likes`);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}
