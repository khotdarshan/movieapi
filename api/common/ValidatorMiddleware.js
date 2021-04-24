import { HTTP_STATUS, ErrorMessages } from './constant';
import mongoose from 'mongoose';

export const userObjectValidator = (req, res, next) => {
    const isValidCredentials = !!req.body.username && !!req.body.password;
    if (!isValidCredentials) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: ErrorMessages.CREDENTIALS_EMPTY });
    } else {
        next();
    }
}

export const userIdValidator = (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: ErrorMessages.INVALID_OBJECT_ID });
    } else {
        next();
    }
}

export const reviewValidator = (req, res, next) => {
    if (!req.body.review) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: ErrorMessages.EMPTY_REVIEW_INPUT });
    } else {
        next();
    }
}

export const voteValidator = (req, res, next) => {
    if(!req.body.vote || Object.keys(req.body.vote).length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: ErrorMessages.EMPTY_VOTE_INPUT });
    } else {
        next();
    }
}

export const movieObjectValidator = (req, res, next) => {
    if(!req.body.name) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: ErrorMessages.EMPTY_MOVIE_NAME_INPUT });
    } else if (!req.body.genre) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: ErrorMessages.EMPTY_MOVIE_GENRE_INPUT });
    } else {
        next();
    }
}