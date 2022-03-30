var express = require('express')
var router = express.Router();
var mysql = require('mysql')
var dbconfig = require('../db/config.js')
var pool = mysql.createPool(dbconfig); 
router.use(express.urlencoded({ extended : true }))

router.get('/', (req, res, next) =>{

    var botable = req.query.botable;

    if(botable == 'preinterview'){ //botable이 preinterview 일 때
        pool.getConnection(function(err, connection) {
            connection.query(
                'select * from reactinterview.'+botable, 
                (error, result) => {
                    if(error) throw error;
                    res.send(result)
                })       
            connection.release(); 
        })
   }else{ //botable이 preinterview가 아닐 때 
        var normal = require('../api/normal')
        router.use('/', normal )
        next('route')
    }
})

module.exports = router; 