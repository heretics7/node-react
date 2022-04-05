var express = require('express');
var normal = require('./normal');
var awsconnect = require('./awsconnect'); // SQL문 저장 되어 있는거 가져와
var router = express.Router();

router.use(express.urlencoded({ extended : true })); // 미들 웨어 -> urlencode 가 핵심기능 리액트가 받아온 노드 주소를 해석해줌

router.post('/', (req, res, next) =>{   
    var type = req.query.type;
    req.body.mapper = "introduceSql";     
    
    if(type){  
        switch(type){
            case 'interviewlist' : req.body.crud = "select"; 
                        req.body.mapper_id = "interview";
                        break;
            case 'interviewwrite': req.body.crud = "insert"; 
                        req.body.mapper_id = "interviewInsert";
                        break;
            case 'interviewmodify': req.body.crud = "update"; 
                        req.body.mapper_id = "interviewModify";
                        break;
            case 'meetinglist': req.body.crud = "select"; 
                        req.body.mapper_id = "meetingArrange";
                        break;
            case 'meetingwrite': req.body.crud = "insert"; 
                        req.body.mapper_id = "meetingArrangeInsert";
                        break;
            default     : req.body.crud = "delete"; 
                        req.body.mapper_id = "interviewDrop";
                        break; 
        }     
            router.use('/', awsconnect );
            next('route');
    }
    else{
        router.use('/', normal );
        next('route');
    }
})

module.exports = router;