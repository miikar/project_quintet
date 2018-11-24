const needle = require('needle');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const { ProfileSchema } = require('./schema');

const db = mongoose.connection;

const main = async () => {
  const data = await needle(
    'get',
    'http://launchpad.espooinnovationgarden.fi/_ah/api/company/v1/startups'
  ).catch(error => {
    console.log('api err', error);
  });
  //console.log(data.body.items);
  await ProfileSchema.collection.drop();
  const insertData = data.body.items.map(s => {
    return {
      name: s.name,
      description: s.description,
      type: s.type,
      industries: s.industries,
      launchpadData: s
    };
  });
  ProfileSchema.insertMany(insertData, (err, done) => {
    console.log('err', err);
    console.log('done', done);
  });
  //console.log('data', insertData);
};

main();
