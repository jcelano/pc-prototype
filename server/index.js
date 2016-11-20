const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/app'));


app.use(bodyParser.json());
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.redirect('app.html');
});

app.get('/foo', function(request, response) {
    response.redirect('clients.json');
});


require("./routes/file_api")(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


