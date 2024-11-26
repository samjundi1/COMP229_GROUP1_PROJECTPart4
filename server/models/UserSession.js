const mongoose = require('mongoose');

// Schema for user sessions
const UserSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        trim: true,
        unique: true,
        required: 'User ID is required'
    },
    sessionToken: {
        type: String,
        trim: true,
        required: 'You need a generated Session Token'
    },
    role: {
        type: String,
        trim: true,
        required: 'Please choose role. Either Vendor or FDA Manager'
    }
});

module.exports = mongoose.model('usersessions', UserSessionSchema);
