const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Movies', 'TV Shows']
    }
}, {
    versionKey: false
});

const Video = mongoose.model('Video', VideoSchema);
module.exports = {
    Video,
    VideoSchema
}
