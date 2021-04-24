import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    minlength: 3,
    maxlength: 20
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  review: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250
  }
});

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  genre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  releaseDate: {
    type: Date
  },
  upvotes: {
    type: Number
  },
  downvotes: {
    type: Number
  },
  reviews: {
    type: [ReviewSchema]
  }
});

MovieSchema.index({ '$**': 'text' });

const Movie = mongoose.model('movie', MovieSchema);

exports.Movie = Movie;