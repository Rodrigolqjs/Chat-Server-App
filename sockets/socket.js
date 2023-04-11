const {io} = require('../index');


// const bands = new Bands();
// bands.addBand(new Band('Queen'));
// bands.addBand(new Band('Bon Jovi'));
// bands.addBand(new Band('Heroes del Silencio'));
// bands.addBand(new Band('Metallica'));

//Socket connection 'Mensajes'
io.on('connection', client => {

  // client.emit('active-bands', {bands: bands.getBands()});

  client.on('disconnect', () => { 
    // console.log('Cliente desconectado')
  });

  client.on('message', (payload) => {
    client.broadcast.emit('messageForClient', {message: payload})
    console.log('Nuevo mensaje', payload.message)
  });

  client.on('add-vote-band', (payload) => {
    bands.voteBand(payload.id);
    io.emit('active-bands', {bands: bands.getBands()});
  });

  client.on('add-band', (payload) => {
    bands.addBand(new Band(payload.name));
    io.emit('active-bands', {bands: bands.getBands()});
  });

  client.on('delete-band', (payload) => {
    bands.deleteBands(payload.id);
    io.emit('active-bands', {bands: bands.getBands()});
  });

});