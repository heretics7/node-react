var express = require('express');
var awsconnect = express.Router();
var mysql = require('mysql');
var dbconfig = require('../db/config');
var pool = mysql.createPool(dbconfig);
var mybatisMapper = require('mybatis-mapper');

awsconnect.use(express.json())

mybatisMapper.createMapper(['./xml/introduceSql.xml']) // 노드를 기본으로 경로 설정
var format = { language : 'sql', indent : '  ' }

awsconnect.get('/', (req, res, next) =>{ 
    var params = req.body;
    var query = mybatisMapper.getStatement(
    params.mapper, params.mapper_id, params, format );

    pool.getConnection(function(err, connection) {
        connection.query(
            query,
            (error, result) => {
                if(error) throw error;
                res.send(result)
            })       
        connection.release(); 
    }) 
})

module.exports = awsconnect;