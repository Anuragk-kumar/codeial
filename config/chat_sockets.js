/* This code exports a function called `chatSockets` that takes a `socketServer` parameter. Inside the
function, it creates a new instance of Socket.IO using the `socketServer` parameter and listens for
new connections. When a new connection is received, it logs a message to the console with the socket
ID. It also listens for the `disconnect` event and logs a message to the console when the socket is
disconnected. */

module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{cors:{origin:'*'}});

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        /* This code is listening for the 'join_room' event emitted by the client and when it receives
        the event, it logs a message to the console with the data received. It then makes the socket
        join the specified chatroom using the `socket.join()` method. Finally, it emits the
        'user_joined' event to all the sockets in the specified chatroom using the `io.in().emit()`
        method, with the data received as the payload. */
        socket.on('join_room', function(data){
            console.log('joining request received', data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined',data);
        });

        /* This code is listening for the 'send_message' event emitted by the client and when it
        receives the event, it broadcasts the message to all the sockets in the specified chatroom
        using the 'receive_message' event. */
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        });

    });

}