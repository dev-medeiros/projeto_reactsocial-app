const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    Timestamp: {
        type: Date,
        default: Date.now,
    },
    });

    const User = mongoose.model("User", userSchema);

    module.exports = User;