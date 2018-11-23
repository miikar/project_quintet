const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  description: String
});

const ProfileSchema = mongoose.model('profiles', profileSchema);

module.exports = { ProfileSchema };
