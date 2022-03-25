var express = require('express');
var app = express();

app.set('port', 8080)
app.get('/', (req, res) => {
    res.send('노드연결성공')
})

app.listen(app.get('port'), () => {
    console.log('node link success')
})