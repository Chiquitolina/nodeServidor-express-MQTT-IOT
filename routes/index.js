const express = require('express');
const router = express.Router();
const dbconnection = require ('../db-connection.js')
const mqttClient = require('../mqtt-connection.js');

router.get('/dispositivos', (req, res) => {
    dbconnection.query('SELECT * FROM dispositivos', (error, results, fields) => {
      if (error) {
        console.error('Error fetching users: ', error);
        res.status(500).send('Error fetching users');
      } else {
        res.json(results);
      }
    });
  });

module.exports = router;
