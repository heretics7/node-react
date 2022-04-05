var express = require('express');
var app = express();

var reactinterview = require('./api/reactinterview');

app.use('/reactinterview', reactinterview);

app.set('port', 8080)
app.post('/', (req, res) => {
    res.send('노드연결성공')
})

app.listen(app.get('port'), () => {
    console.log('node link success')
})