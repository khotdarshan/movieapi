import * as userDao from '../dao/user.dao';
import * as util from '../util';
import config from '../../config/environment';
import { HTTP_STATUS, ErrorMessages } from '../common/constant';
export default (app) => {
    app.use(async (req, res, next) => {
        if ((!!config.whiteListUrls[req.path] && config.whiteListUrls[req.path] === req.method)) {
            next();
        } else {
            const token = util.getTokenFromHeader(req);
            if (!token) {
                util.responseWrapper(res, null, HTTP_STATUS.BAD_REQUEST, ErrorMessages.NO_TOKEN_PROVIDED);
            } else {
                try {
                    const response = await util.checkTokenExpiry(await userDao.findToken(token));
                    if (response.error) {
                        util.responseWrapper(res, null, response.statusCode, response.error);
                    }
                    else if (response.isTokenExpired) {
                        util.responseWrapper(res, null, HTTP_STATUS.REQUEST_TIMEOUT, ErrorMessages.SESSION_EXPIRED);
                    } else {
                        const decoded = await util.verifyToken(token);
                        const user = await userDao.findOne({ username: decoded.username }, { password: 0, __v: 0 });
                        req.user = user;
                        next();
                    }
                } catch (e) {
                    if (e.message === ErrorMessages.INVALID_TOKEN) {
                        util.responseWrapper(res, null, HTTP_STATUS.ACCESS_DENIED, ErrorMessages.INVALID_TOKEN);
                    } else {
                        util.responseWrapper(res, null, HTTP_STATUS.INTERNAL_SERVER_ERROR, e.message);
                    }
                }
            }
        }
    })
}