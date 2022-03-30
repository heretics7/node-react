var express = require('express')
var router = express.Router();
var mysql = require('mysql')
var dbconfig = require('../db/config.js')
var pool = mysql.createPool(dbconfig); 
router.use(express.urlencoded({ extended : true }))

router.get('/', (req, res, next) =>{

    var botable = req.query.botable;

    var crud = 'select';

    switch(botable){ // 스위치 방식
        case 'preinterview' :
            crud = 'select';
            break;
        case 'interview' :
            crud = 'select';
            break;
        case 'contact' :
            crud = 'insert into';
            break;
        default:
            botable = 'none';
            crud = '';
            break;
    }

    if(botable !== 'none'){ 
        pool.getConnection(function(err, connection) {
            connection.query(
                'select * from reactinterview.'+botable, 
                (error, result) => {
                    if(error) throw error;
                    res.send(result)
                })       
            connection.release(); 
        })
   }else{ //botable이 없으면 
        var normal = require('../api/normal')
        router.use('/', normal )
        next('route')
    }
})

module.exports = router; 