const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
});

const routes = require('./routes/index.js');
const connect = require('./mqtt-connection.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);

app.get('/', function (req, res) {
  res.send('¡Hola mundo!')
})

client = connect()

// Manejar eventos de conexión de clientes
io.on('connection', (socket) => {
  console.log('\n')
  console.log('WS: ///////////////////// Un cliente se ha conectado');

  client.on('message', (topic, message) => {
    console.log('\n')
    console.log(`Mensaje recibido en el tema "${topic}": ${message.toString()}`);
    // Enviar mensaje a un cliente específico
    socket.emit('mensaje', message.toString());
  });

  // Manejar eventos de desconexión de clientes
  socket.on('disconnect', () => {
    console.log('\n')
    console.log('WS: //////////////////// Un cliente se ha desconectado');
  });
});

// Inicia el servidor de Express.js
server.listen(3000, () => {
  console.log('\n')
  console.log('///////////////////// Servidor de Express.js iniciado en el puerto 3000 /////////////////////');
});