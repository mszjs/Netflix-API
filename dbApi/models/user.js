const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const { VideoSchema } = require('./video');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    myVideos: [{
        _id: {
            type: Schema.ObjectId,
            required: true,
            index: { unique:true}
        },
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
    }]
    
}, {
    versionKey: false
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
