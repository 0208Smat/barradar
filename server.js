const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})