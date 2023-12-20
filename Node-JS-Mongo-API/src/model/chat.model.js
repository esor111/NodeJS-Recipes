const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  type: { type: String, enum: ['individual', 'group'], required: true },
  name: { type: String }, // Optional, for group chats
  participants: [{
    userId: { type: String, required: true }, // Replace ref with userId
    type: { type: String, enum: ['user', 'business'], required: true },
    role: { type: String, enum: ['owner', 'admin', 'member'] }, // Optional, for group chats
  }],
  additional_data: { type: Object }, // Optional
  timestamp: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Chat', ChatSchema);
