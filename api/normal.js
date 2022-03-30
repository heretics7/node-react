var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send("데이터 없음")
})

module.exports = router;