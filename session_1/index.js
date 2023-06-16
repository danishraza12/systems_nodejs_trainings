const express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())

const port = 5001;

const items = [
  {name: 'Item 1', price: '$30'},
  {name: 'Item 2', price: '$32'},
  {name: 'Item 3', price: '$33'},
  {name: 'Item 4', price: '$34'},
];

app.get('/', function (req, res) {

  fs.readFile('assets/file.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });

})

app.get('/items', function (req, res) {
  res.status(200).send(items);
})

app.post('/items', function (req, res) {
  const data = req.body;
  items.push(data);
  res.status(200).send(items);
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});