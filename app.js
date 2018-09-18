var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;
app.get('/', function (req, res) {
   res.send('<h1>Sweeper in Multiplayer Piano</h1><br>You can use b!sweep [channel name] to anything u want');
})

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("listening to "+port)
})
