const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const SessionSchema = new mongoose.Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  sessionID: {
    type: Number,
    required: true,
    unique: true
  }
}, {
    versionKey: false
});

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;