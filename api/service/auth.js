import * as util from '../util';
import * as userDao from '../dao/user.dao';
import { HTTP_STATUS, ErrorMessages, Messages } from '../common/constant';

export const login = async (req, res) => {
    const { username, password } = req.body;
    const validateResult = await verifyUser(username, password);
    if (validateResult.statusCode !== HTTP_STATUS.OK) {
        util.responseWrapper(res, null, validateResult.statusCode, validateResult.message);
    } else {
        const token = await getToken(username, password);
        util.responseWrapper(res, token);
    }
}

export const logout = async (req, res) => {
    const token = util.getTokenFromHeader(req);
    await userDao.deleteToken(token);
    util.responseWrapper(res, { message: Messages.LOGGED_OUT_SUCCESSFULLY });
}

const getToken = async (username, password) => {
    const token = await util.generateToken(username, password);
    await userDao.saveToken(username, token);
    return { token };
}

const verifyUser = async (username, password) => {
    const user = await userDao.findOne({ username });
    if (!user) {
        return { statusCode: HTTP_STATUS.NOT_FOUND, message: ErrorMessages.USER_NOT_FOUND };
    }
    const isValidUser = await util.comparePassword(password, user.password);
    if (isValidUser) {
        return { statusCode: HTTP_STATUS.OK, message: ErrorMessages.USER_VERIFIED_SUCCESSFULLY };
    } else {
        return { statusCode: HTTP_STATUS.ACCESS_DENIED, message: ErrorMessages.INVALID_USER_CREDENTIALS };
    }
}