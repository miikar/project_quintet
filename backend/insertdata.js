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
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjY1ZjRhZmFjNjExMjlmMTBjOTk5MTU1ZmE1ODZkZWU2MGE3MTM3MmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZGlnaXRhbC1wbGF0Zm9ybS1wcm9kIiwicGljdHVyZSI6Ii9pbWcvYXZhdGFyLmpwZyIsImF1ZCI6ImRpZ2l0YWwtcGxhdGZvcm0tcHJvZCIsImF1dGhfdGltZSI6MTU0Mjk3OTk2NiwidXNlcl9pZCI6IlJJVE9VNGFrYWhNNGpCcXJKak4wSU1MSjZNeDEiLCJzdWIiOiJSSVRPVTRha2FoTTRqQnFySmpOMElNTEo2TXgxIiwiaWF0IjoxNTQzMTMwOTU5LCJleHAiOjE1NDMxMzQ1NTksImVtYWlsIjoiYW50dGlrdXIrbGF1bmNocGFkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFudHRpa3VyK2xhdW5jaHBhZEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.GuBawkPh7BMYwupkJ-aInMM2WelIHAYsDI1-o7vpvCBkC4crZrokPGSHCp8JbXnxCWOQdeEOIBkGttb84zcBY5sTY_y5DSFKZOkS9iMlCbJQ6GBe_vEmE8EycrXvg0AXllb_gLMxyffmsqRTz5K_kP5bVhx7gplfJGwEWzOucqbl4QzqrqZfHKz7A9mR9wbOaINrymqEZnyDRd6-r564hS93FVtiNBXhBJ19xyKqIKdBfYap5B30tPhNISOQT4RuS70npn2XFb3NX6MzFiFb8IxGcpwLcAOo4D12sanIbDSNhsJzuuigmSX3fEqKM46xZQbVW1FqpXWM3gQaRaugHA'
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
