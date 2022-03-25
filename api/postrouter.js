var express = require('express');
var postrouter = express.Router();

postrouter.post('/', (req, res) => {
    res.send({
        "naver" : "www.naver.com",
        "daum" : "www.daum.net",
        "google" : "www.google.com"
    });
});

module.exports = postrouter;