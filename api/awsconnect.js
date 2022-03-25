var express = require('express');
var awsconnect = express.Router();
var mysql = require('mysql');
var dbconfig = require('../db/config');
var connection = mysql.createConnection(dbconfig);

awsconnect.post('/', (req, res) => {
    connection.query('SELECT * FROM contact' , (error, result) => {
        if(error) throw error;
        console.log('DB 내용 :', result);
        res.send(result);
    })
})

module.exports = awsconnect;