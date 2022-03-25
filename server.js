var express = require('express');
var app = express();
var getrouter = require('./api/getrouter');
var postrouter = require('./api/postrouter');

app.use('/get', getrouter);
app.use('/post', postrouter);

app.set('port', 8080)
app.get('/', (req, res) => {
    res.send('노드연결성공')
})

app.listen(app.get('port'), () => {
    console.log('node link success')
})