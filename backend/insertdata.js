const needle = require('needle');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const { ProfileSchema } = require('./schema');

const db = mongoose.connection;

const main = async () => {
  const technologiesReq = await needle(
    'get',
    'http://launchpad.espooinnovationgarden.fi/_ah/api/utility/v1/values/technologies'
  ).catch(error => {
    console.log('api err', error);
  });
  const technologies = technologiesReq.body.value;
  // console.log({ technologies });

  const industriesReq = await needle(
    'get',
    'http://launchpad.espooinnovationgarden.fi/_ah/api/utility/v1/values/industries'
  ).catch(error => {
    console.log('api err', error);
  });
  const industries = industriesReq.body.value;

  const data = await needle(
    'get',
    'http://launchpad.espooinnovationgarden.fi/_ah/api/company/v1/startups',
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjY1ZjRhZmFjNjExMjlmMTBjOTk5MTU1ZmE1ODZkZWU2MGE3MTM3MmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZGlnaXRhbC1wbGF0Zm9ybS1wcm9kIiwicGljdHVyZSI6Ii9pbWcvYXZhdGFyLmpwZyIsImF1ZCI6ImRpZ2l0YWwtcGxhdGZvcm0tcHJvZCIsImF1dGhfdGltZSI6MTU0Mjk3OTk2NiwidXNlcl9pZCI6IlJJVE9VNGFrYWhNNGpCcXJKak4wSU1MSjZNeDEiLCJzdWIiOiJSSVRPVTRha2FoTTRqQnFySmpOMElNTEo2TXgxIiwiaWF0IjoxNTQzMDc4MTUwLCJleHAiOjE1NDMwODE3NTAsImVtYWlsIjoiYW50dGlrdXIrbGF1bmNocGFkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFudHRpa3VyK2xhdW5jaHBhZEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.SWhlkF2fdBCyBxrrf048jhG0nmucX2G4d7cS0ZBsK6D2REdByDnbYEr9WSFKIa9wJFOADP0l6vK0YessRb8CTza6auW2NW9a6Ls1spxV07RlS-62eSH0sw7hrRxS-uJJKaOMOsd5lIr0jGxS97mM5Llfmf4mhyKbFOYWJTQ-r0aXHBP4bnYBOiWMigiS-v-MNgzeHoOXklH96j4xZ5xrgRWvKr0WBF-bz8HL2SfrfyT0VctypmCXdZfHp-O2830pl20pvoFhssQvBJSCCfWpkhyDE-HMqe_b0N9KXCm-iXNg3TZ4rK6yLiDxvHI7Hx7IWIcygcW04y88tclTqinqiA'
      }
    }
  ).catch(error => {
    console.log('api err', error);
  });
  await ProfileSchema.collection.drop();
  const insertData = data.body.items.map(s => {
    return {
      name: s.name,
      description: s.description,
      type: s.type,
      industries: s.industries.map(i => {
        return industries.find(ind => ind.key === i).name;
      }),
      technologies: s.technologies
        ? s.technologies.map(t => {
            return technologies.find(tec => tec.key == t).name;
          })
        : [],
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
