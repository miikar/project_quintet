const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
  name: String,
  description: String
});

const ProfileSchema = mongoose.model('profileSchema', profileSchema);

module.exports = { ProfileSchema }; 