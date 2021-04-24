import mongoose from 'mongoose';

const UserTokenSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true
    },
    token: {
        type: String,
        required: true
    },
    expiry: {
        type: Number,
        default: 60
    }
},
{
    timestamps: true
});

const UserToken = mongoose.model('usertoken', UserTokenSchema);
exports.UserToken = UserToken;