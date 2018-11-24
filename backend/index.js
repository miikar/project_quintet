const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const mkdirp = require('mkdirp');
const cors = require('cors');
const path = require('path');

const { ProfileSchema } = require('./schema');
mongoose.connect('mongodb://localhost/test');

const spawn = require('child_process').spawn;
const ObjectId = mongoose.Types.ObjectId;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connection open!');
  // we're connected!
});

const app = express();
const port = 3001;

app.use('/uploads', express.static('uploads'));

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
  .get('/profiles/:id/similar', async (req, res, next) => {
    const profile = await ProfileSchema.findOne({ _id: req.params.id }).exec();
    const spawn = require('child_process').spawn;
    const py = spawn('python', ['ml_algo.py']);
    const data = profile._id;
    let dataString = '';

    py.stdout.on('data', function(data) {
      dataString += data.toString();
    });
    py.stderr.on('data', err => {
      console.log('ERROR FROM PYTHON', err.toString());
    });

    py.stdout.on('end', async () => {
      console.log(dataString.toString());
      const test = dataString
        .split('recommendations:')[1]
        .trim()
        .replace(/'/g, '"');
      const parsed = JSON.parse(test);
      console.log('Recommended ids', parsed);

      const recommendedProfiles = await Promise.all(
        Object.keys(parsed).map(id => {
          return ProfileSchema.findOne({ _id: id }).exec();
        })
      );
      return res.send(recommendedProfiles);
    });
    py.stdin.write(JSON.stringify(data));

    py.stdin.end();
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

// UPLOAD ROUTES
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const profileId = ObjectId();
    file.profileId = profileId;
    mkdirp('uploads/' + profileId + '/', err => {
      if (err) console.log('mkdirp err', err);
      return cb(null, 'uploads/' + profileId + '/');
    });
  },
  filename: function(req, file, cb) {
    const filename = path.normalize(file.originalname);
    cb(null, filename);
  }
});

const upload = multer({ storage });
app.post(
  '/profiles/:id/upload',
  upload.single('video'),
  async (req, res, next) => {
    const videoPath = '/' + req.file.path;
    const updatedProfile = await ProfileSchema.findOneAndUpdate(
      { _id: req.params.id },
      { video: { path: videoPath } },
      { new: true }
    );
    res.json(updatedProfile);
  }
);

app.post('/upload', upload.single('video'), async (req, res, next) => {
  const videoPath = '/' + req.file.path;
  const rProfile = JSON.parse(req.body.profile);
  const profile = {
    _id: req.file.profileId,
    video: {
      path: req.file.path
    },
    ...rProfile
  };
  const writeProfile = await ProfileSchema.create(profile);
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
