var express = require('express')
var bodyParser = require("body-parser");
var app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var comments = require('./comments')

// respond with "hello world" when a GET request is made to the homepage
app.post('/comment', function (req, res) {
	comments.processComment(req.body.data)
	res.sendStatus(200)
})

app.use(express.static('public'))

app.listen(80, function(){
   console.log('Server is running on port 80...');
});
