// models/messaging.model.js
const mongoose = require('mongoose');

const messagingSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    messages: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    unreadCount: {
      type: Number,
      default: 0,
    },
    lastMessage: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      content: {
        type: String,
      },
      timestamp: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Messaging', messagingSchema);
