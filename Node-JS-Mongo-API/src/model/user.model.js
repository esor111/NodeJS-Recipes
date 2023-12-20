const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  kahaId: { type: String, required: true },
  username: { type: String, required: false, unique: true },
  email: { type: String, required: false, unique: false },
  password: { type: String, required: false },
  isBusiness: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);