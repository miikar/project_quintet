const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { ProfileSchema } = require('./schema');
mongoose.connect('mongodb://localhost/test');

const spawn = require('child_process').spawn;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connection open!');
  // we're connected!
});

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser());

// ROUTES
app
  .get('/profiles', async (req, res, next) => {
    const profiles = await ProfileSchema.find({}).exec();
    return res.json(profiles);
  })
  .get('/profiles/:id', async (req, res, next) => {
    const profile = await ProfileSchema.findOne({ _id: req.params.id }).exec();
    return res.json(profile);
  })
  .patch('/profiles/:id', async (req, res, next) => {
    const updatedProfile = await ProfileSchema.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    return res.json(updatedProfile);
  })
  .post('/profiles', async (req, res, next) => {
    const writeProfile = await ProfileSchema.create(req.body);
    return res.json(writeProfile);
  });

app.get('/test', (req, res, next) => {
  // From https://www.sohamkamani.com/blog/2015/08/21/python-nodejs-comm/
  const spawn = require('child_process').spawn;
  const py = spawn('python', ['test.py']);
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 12];
  let dataString = '';

  py.stdout.on('data', function(data) {
    dataString += data.toString();
  });
  py.stdout.on('end', function() {
    console.log('Sum of numbers=', dataString);
    res.send(dataString);
  });
  py.stdin.write(JSON.stringify(data));

  py.stdin.end();
});

// JUST TEST ENDPOINT
app.post('/test', (req, res, next) => {
  // From https://www.sohamkamani.com/blog/2015/08/21/python-nodejs-comm/
  const spawn = require('child_process').spawn;
  const py = spawn('python', ['test.py']);
  const data = req.body.data;
  let dataString = '';

  py.stdout.on('data', function(data) {
    dataString += data.toString();
  });
  py.stdout.on('end', function() {
    console.log('Sum of numbers=', dataString);
    res.send(dataString);
  });
  py.stdin.write(JSON.stringify(data));

  py.stdin.end();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
