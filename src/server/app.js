var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
/*app.get('/', function (req, res) {
  res.send('hello world')
})*/

app.use(express.static('public'))

// 4. Listen on port 8080
app.listen(8080, function(){
   console.log('Server is running on port 8080...');
});
