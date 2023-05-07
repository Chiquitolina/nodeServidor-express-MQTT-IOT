let fs = require('fs');
let mqtt = require('mqtt');
require('dotenv').config();

//PRIVATE CERTIFICATE
let KEY = fs.readFileSync(process.env.MQTT_LOCAL_PK); //root to your own certs

//SELF CERTIFICATE
let CERT = fs.readFileSync(process.env.MQTT_LOCAL_CERT); //root to your own certs

//CA CERTIFICATE
let TRUSTED_CA_LIST = fs.readFileSync(process.env.MQTT_CERT_FILE); //root to your own certs


//BROKER CONFIGS
const options = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  IdClient: 1,
  protocol: 'mqtt',
  key: KEY,
  cert: CERT,
  ca: TRUSTED_CA_LIST,
  username: '',
  password: '',
  reconnectPeriod: 10000
} 

const client = mqtt.connect(options)

let topic = process.env.MQTT_TOPIC

function connect() {

client.on('connect', function () {
  console.log('/////////////// Conectado al broker correctamente ///////////////////');
  console.log('\n')
  client.subscribe(topic, function (err) {
    if (err) {
      console.log('Error subscribing to topic:', err);
    } else {
      console.log(`/////////////// Conectado al tópico ${topic} correctamente //////////////`);
    }
  });
});

client.on('error', (err) => {
  console.log(`MQTT client error: ${err}`);
  // Handle the error here
});

return client;

}

module.exports = connect;
