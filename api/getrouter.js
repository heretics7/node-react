var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('router 연결 성공')
})

module.exports = router;