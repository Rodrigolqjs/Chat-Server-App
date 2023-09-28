const { validateSocketJWT } = require('../helpers/jwt');
const {io} = require('../index');
const {userConnected, userDisconnected, saveMessage} = require('../controllers/socket')

//Socket connection 'Mensajes'
io.on('connection', client => {
  console.log('Cliente conectado');

  const [valid, uid] = validateSocketJWT(client.handshake.headers['x-token'])
  if(!valid) {
    userDisconnected(uid)
    return client.disconnect();
  } else {
    userConnected(uid);

    client.join(uid);

    client.on('personal-message', async (payload) => {
      console.log('entro save message');
      if (await saveMessage(payload)) {
        io.to(payload.to).emit('personal-message', payload);
      }
    })
  }

  client.on('disconnect', () => { 
    userDisconnected(uid)
    console.log('Cliente desconectado');
  });

});