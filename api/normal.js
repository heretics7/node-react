var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send("DB에 접근하지 않는 Router")
})

module.exports = router;