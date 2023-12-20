const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  chat_id: { type: Schema.Types.ObjectId, ref: 'ChatSchema', required: true },
  sender_id: { type: String, required: true }, // Replace ref with userId
  content: {
    text: { type: String }, // Optional, for text messages
    data: { type: Object }, // Optional, for other types
  },
  type: { type: String, enum: ['text', 'image', 'product', 'address', 'custom'], required: true },
  recipient_id: { type: String },
  attachments: {
    type: [
      {
        url: String,
        localPath: String,
      },
    ],
    default: [],
  },
  additional_data: { type: Object }, // Optional
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);