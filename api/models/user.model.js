import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  favourites: {
    type: [String]
  }
});

UserSchema.index({ username: 1 }, { unique: true, background: true });

const User = mongoose.model('user', UserSchema);

exports.User = User;