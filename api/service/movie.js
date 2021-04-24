import * as movieDao from '../dao/movie.dao';
import * as util from '../util';
import { HTTP_STATUS, ErrorMessages } from '../common/constant';

export const save = async (req, res) => {
    const movie = await movieDao.save(req.body);
    if (movie.error) {
        util.responseWrapper(res, null, movie.statusCode, movie.error);
    } else {
        movie.__v = undefined;
        util.responseWrapper(res, movie);
    }
}

export const update = async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieDao.update(movieId, req.body);
    if (movie.error) {
        util.responseWrapper(res, null, movie.statusCode, movie.error);
    } else {
        movie.__v = undefined;
        util.responseWrapper(res, movie);
    }
}

export const updateReview = async (req, res) => {
    const movieId = req.params.id;
    const userId = req.user.id;
    const username = req.user.username;
    const movie = await movieDao.updateReview(movieId, userId, username, req.body.review);
    if (movie.error) {
        util.responseWrapper(res, null, movie.statusCode, movie.error);
    } else {
        util.responseWrapper(res, movie);
    }
}

export const updateVote = async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieDao.updateVote(movieId, req.body.vote);
    if (movie.error) {
        util.responseWrapper(res, null, movie.statusCode, movie.error);
    } else {
        util.responseWrapper(res, movie);
    }
}

export const get = async (req, res) => {
    let movies, filter;

    const sortKey = req.query.sort;
    const orderBy = req.query.order;

    delete req.query.sort;
    delete req.query.order;
    Object.keys(req.query).forEach(key => {
        if (['upvotes', 'downvotes', 'search'].indexOf(key) === -1) {
            req.query[key] = { $regex: new RegExp(req.query[key], "i") };
        }
    });
    const searchText = req.query.search;
    delete req.query.search;
    if (searchText) {
        filter = { $text: { $search: searchText, $caseSensitive: false } };
    } else {
        filter = req.query;
    }
    movies = await movieDao.find(filter, { __v: 0 }, { sort: { [sortKey]: orderBy } });
    util.responseWrapper(res, movies);
}

export const getById = async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieDao.findById(movieId, { __v: 0 });
    if (movie === null) {
        util.responseWrapper(res, null, HTTP_STATUS.NOT_FOUND, ErrorMessages.MOVIE_NOT_FOUND);
    } else {
        util.responseWrapper(res, movie);
    }
}
