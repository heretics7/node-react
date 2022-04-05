var express = require('express');
var awsconnect = express.Router();

var mysql = require('mysql'); // 미들웨어 -> 핵심 라이브러리 / 모듈 sql문 번역
var mybatisMapper = require('mybatis-mapper'); // 미들웨어 -> 핵심 라이브러리 / 모듈 sql문 쿼리를 요청함

var dbconfig = require('../db/config');
var pool = mysql.createPool(dbconfig);

awsconnect.use(express.json()); // -> use는 받을 때 쓴다. request의 body를 json화 하여 받을 때. 

mybatisMapper.createMapper(['./xml/introduceSql.xml']) // 노드를 기본으로 경로 설정
var format = { language : 'sql', indent : '  ' }

awsconnect.post('/', (req, res) =>{ 
    var params = req.body;
    var query = mybatisMapper.getStatement(
    params.mapper, params.mapper_id, params, format ); // sql 문으로 담는 과정

    pool.getConnection(function(err, connection) {

        if(err) console.log('에러 나면 뜹니다' +err);

        connection.query(
            query, // 여기는 반드시 sql문이 들어와야 에러가 안남
            (error, result) => {
                if(error) throw error; // result를 받지 못하는 상활

                if(req.body.crud == "select"){ // select 말고는 데이터 값을 받아낼 것이 없음
                    res.send(result);

                }else{ // 
                    res.send('success');
                }
            })       
        connection.release(); // sql pool에 요청한걸 받아왔으니 연결 종료
    }) 
})

module.exports = awsconnect;