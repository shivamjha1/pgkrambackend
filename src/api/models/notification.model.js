const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    notificationType: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['read', 'unread', 'dumped'],
      default: 'unread',
    },
  },
  {
    timestamps: true,
  }
);

// Add a transform method to format the data before sending it as a response
notificationSchema.methods.transform = function () {
  const transformed = {};
  const fields = ['id', 'recipientId', 'notificationType', 'message', 'timestamp', 'status'];

  fields.forEach((field) => {
    transformed[field] = this[field];
  });

  return transformed;
};

module.exports = mongoose.model('Notification', notificationSchema);
