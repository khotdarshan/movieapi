import * as userDao from '../dao/user.dao';
import * as movieDao from '../dao/movie.dao';
import * as util from '../util';
import { ErrorMessages, HTTP_STATUS } from '../common/constant';

export const save = async (req, res) => {
    const user = await userDao.save(req.body);
    if (user.error) {
        util.responseWrapper(res, null, user.statusCode, user.error);
    } else {
        util.responseWrapper(res, user);
    }
}

export const update = async (req, res) => {
    const userId = req.params.id;
    const user = await userDao.update(userId, req.body);
    if (user.error) {
        util.responseWrapper(res, null, user.statusCode, user.error);
    } else {
        util.responseWrapper(res, user);
    }
}

export const get = async (req, res) => {
    let users = await userDao.find(req.query, { password: 0, __v: 0 });
    util.responseWrapper(res, users);
}

export const getById = async (req, res) => {
    const userId = req.params.id;
    const user = await userDao.findById(userId, { password: 0, __v: 0 });
    if(user === null) {
        util.responseWrapper(res, null, HTTP_STATUS.NOT_FOUND, ErrorMessages.USER_NOT_FOUND);
    } else {
        util.responseWrapper(res, user);
    }
}

export const getRecommended = async (req, res) => {
    const userId = req.user.id;
    const user = await userDao.findById(userId);
    if (user === null) {
        util.responseWrapper(res, null, HTTP_STATUS.NOT_FOUND, ErrorMessages.USER_NOT_FOUND);
    } else {
        const filter = { genre: { $in: user.favourites } };
        const movies = await movieDao.find(filter, { __v: 0 });
        util.responseWrapper(res, movies);
    }
}