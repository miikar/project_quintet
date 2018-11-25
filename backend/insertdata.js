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
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjY1ZjRhZmFjNjExMjlmMTBjOTk5MTU1ZmE1ODZkZWU2MGE3MTM3MmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZGlnaXRhbC1wbGF0Zm9ybS1wcm9kIiwicGljdHVyZSI6Ii9pbWcvYXZhdGFyLmpwZyIsImF1ZCI6ImRpZ2l0YWwtcGxhdGZvcm0tcHJvZCIsImF1dGhfdGltZSI6MTU0Mjk3OTk2NiwidXNlcl9pZCI6IlJJVE9VNGFrYWhNNGpCcXJKak4wSU1MSjZNeDEiLCJzdWIiOiJSSVRPVTRha2FoTTRqQnFySmpOMElNTEo2TXgxIiwiaWF0IjoxNTQzMTM4NDE4LCJleHAiOjE1NDMxNDIwMTgsImVtYWlsIjoiYW50dGlrdXIrbGF1bmNocGFkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFudHRpa3VyK2xhdW5jaHBhZEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.kni7EzUa_vsCSIit3bgHM3GbmhVEJ-RfIfQ2BogAqVMV633GTBV1CUy1u4-iX5W0oQnz9jg2cyrhZLafNU8qO1GF4jQcOg-FjPp-2SwbAVUtuIgYv0dtPE51_lof65Q8WFV3tw46xpIl3S9hYIjt7jIuGQbYBwqzo3O-xXSBDg8TCiVnwXvohjYQaPDXkeY3sdnsFbwakQipthxGB8iYu__x-G1zGw0CuNPFkYy573JHB3XinRl-i-BPA95K5Os_rx-9iH51HSwi_axMllKI6udmcoCmGz2mM0QPQQT78t6ThXC06XS2bYtxEtU1PMnYKEvf8zmODueT8VEPO_wusA'
      }
    }
  ).catch(error => {
    console.log('api err', error);
    });
  try {
    await ProfileSchema.collection.drop();
  } catch (ex) {
    console.log('ex', ex);
  }
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
