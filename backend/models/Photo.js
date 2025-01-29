const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        required: true,
    },
    comments: {
        type: Array,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    Timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;