const express = require('express')
const bodyParser = require('body-parser');
var spawn = require("child_process").spawn;

const app = express()
const port = 3000

app.use(bodyParser());

app.get('/test', (req, res, next) => {

  // From https://www.sohamkamani.com/blog/2015/08/21/python-nodejs-comm/
  const spawn = require('child_process').spawn;
  const py = spawn('python', ['test.py']);
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 12];
  let dataString = '';

  py.stdout.on('data', function(data){
    dataString += data.toString();
  });
  py.stdout.on('end', function(){
    console.log('Sum of numbers=', dataString);
    res.send(dataString);
  });
  py.stdin.write(JSON.stringify(data));

  py.stdin.end()
})

app.post('/test', (req, res, next) => {
    // From https://www.sohamkamani.com/blog/2015/08/21/python-nodejs-comm/
    const spawn = require('child_process').spawn;
    const py = spawn('python', ['test.py']);
    const data = req.body.data;
    let dataString = '';
  
    py.stdout.on('data', function(data){
      dataString += data.toString();
    });
    py.stdout.on('end', function(){
      console.log('Sum of numbers=', dataString);
      res.send(dataString);
    });
    py.stdin.write(JSON.stringify(data));
  
    py.stdin.end()
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))