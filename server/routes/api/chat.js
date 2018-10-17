module.exports = (io) => {


  let users = [];
  let counter = {};
  io.on('connection', (socket) => {

    socket.on('addItem', (data) => {
      socket.broadcast.to(data.room).emit('addItem', data);
    });

    socket.on('join', (room) => {
      counter[room]? counter[room]=1 : counter[room]++;
      socket.join(room);
    });


    socket.on('message', (data) => {
      socket.broadcast.to(data.room).emit('message', {
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
      counter--;
    })
  });

};
