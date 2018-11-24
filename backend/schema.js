const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  description: String,
  launchpadData: mongoose.Schema.Types.Mixed
});

const ProfileSchema = mongoose.model('profiles', profileSchema);

module.exports = { ProfileSchema };
