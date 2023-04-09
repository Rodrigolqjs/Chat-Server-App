const {io} = require('../index');

//Socket connection 'Mensajes'
io.on('connection', client => {
    // console.log('Cliente conectado')
//   client.on('event', data => { /* … */ });
  client.on('disconnect', () => { 
    // console.log('Cliente desconectado')
  });

  client.on('message', (payload) => {
    console.log('Message!!', payload.nombre);

    io.emit('message', {admin: 'Resp de admin'});
  })

});