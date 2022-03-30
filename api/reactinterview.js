var express = require('express');
var normal = require('./normal');
var awsconnect = require('./awsconnect');
var router = express.Router();

router.use(express.urlencoded({ extended : true }));

router.get('/', (req, res, next) =>{   
    var sqltable = req.query.type;  
    if( sqltable == 'aws'){ // DB 접근하는 Router
        req.body.mapper = "introduceSql"; // mybatis_mapper의 namespace
        req.body.crud = "select"; // select, insert, update, delete 중 선택
        req.body.mapper_id = "preinterview"; // sql문 정보를 담고있는 객체의 id

        router.use('/', awsconnect);
        next('route');

    }else{ // DB 접근하지 않는 Router
        router.use('/', normal);
        next('route');
    };
});

module.exports = router;