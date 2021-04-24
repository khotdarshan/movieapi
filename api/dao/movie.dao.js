import { Movie as MovieModel } from '../models/movie.model';
import { ErrorMessages, HTTP_STATUS } from '../common/constant';

export const find = async (filter, projection, options) => {
    filter = filter || {};
    projection = projection || {};
    options = options || {};
    return await MovieModel.find(filter, projection, options);
}

export const findOne = async (filter, projection) => {
    filter = filter || {};
    projection = projection || {};
    return await MovieModel.findOne(filter, projection);
}

export const findById = async (id, projection) => {
    projection = projection || {};
    return await MovieModel.findById(id, projection);
}

export const save = async (movie) => {

    const response = await (new MovieModel(movie)).save()
        .catch(e => {
            return { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, error: e.message };
        });
    return response;
}

export const update = async (id, movie) => {

    const response = await MovieModel.findOneAndUpdate(
        { _id: id },
        { $set: movie },
        { new: true, projection: { __v: 0 } }
    )
        .catch(e => {
            return { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, error: e.message };
        });
    return response ? response : { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, error: ErrorMessages.MOVIE_NOT_FOUND };
}

export const updateReview = async (movieId, userId, username, review) => {

    const response = await MovieModel.findOneAndUpdate(
        { _id: movieId },
        { $push: { reviews: { userId, username, review } } },
        { new: true, projection: { __v: 0 } }
    )
        .catch(e => {
            return { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, error: e.message };
        });
    return response ? response : { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, error: ErrorMessages.MOVIE_NOT_FOUND };
}

export const updateVote = async (movieId, vote) => {
    vote.upvote = vote.upvote ? 1 : 0;
    vote.downvote = vote.downvote ? 1 : 0;
    const response = await MovieModel.findOneAndUpdate(
        { _id: movieId },
        { $inc: { upvotes: vote.upvote, downvotes: vote.downvote } },
        { new: true, projection: { __v: 0 } }
    )
        .catch(e => {
            return { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, error: e.message };
        });
    return response ? response : { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, error: ErrorMessages.MOVIE_NOT_FOUND };
}
