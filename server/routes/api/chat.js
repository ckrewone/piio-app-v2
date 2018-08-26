module.exports = (io) => {


  let users = [];
  let counter = 0;
  io.on('connection', (socket) => {
    counter++;
    console.log('socket connected');


    socket.on('message', (data) => {
      socket.broadcast.emit('message', {
        body: data.body,
        username: data.username
      });
    });

    socket.on('send-nickname', (username) => {
      socket.username = username;
      users.push(socket.username);
      socket.emit('send-nickname', users)
    });

    socket.emit('get-counter', counter);

    socket.on('remove-user', (user) => {
      users.split(user).join('');
    });

    socket.on('disconnect', () => {
      console.log('socket disconnect');
      counter--;
    })
  });

};
