const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: false // Agrega esta línea para deshabilitar SSL
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error al conectarse a la base de datos: ', err);
    } else {
      console.log('\n')
      console.log('DB:::::::::::::::::: Conexión exitosa a la base de datos MySQL');
      console.log('\n')
    }
  });
  
  module.exports = connection;