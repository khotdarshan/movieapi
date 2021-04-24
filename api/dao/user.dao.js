import { User as UserModel } from '../models/user.model';
import { UserToken as UserTokenModel } from '../models/user.token.model';
import { ErrorMessages, HTTP_STATUS } from '../common/constant';
import * as util from '../util';

export const find = async (filter, projection, options) => {
    filter = filter || {};
    projection = projection || {};
    options = options || {};
    return await UserModel.find(filter, projection, options);
}

export const findOne = async (filter, projection) => {
    filter = filter || {};
    projection = projection || {};
    return await UserModel.findOne(filter, projection);
}

export const findById = async (id, projection) => {
    projection = projection || {};
    return await UserModel.findById(id, projection);
}

export const save = async (user) => {

    user.password = await util.generateHash(user.password);
    const response = await (new UserModel(user)).save()
        .catch(e => {
            return { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, error: e.message };
        });
    response.password = undefined;
    response.__v = undefined;
    return response;
}

export const update = async (id, user) => {
    const userEntity = await UserModel.findById(id);
    if (userEntity) {
        if (user.password) {
            userEntity.password = await util.generateHash(user.password);
        }
        if (user.favourites) {
            user.favourites.forEach(favourite => {
                if (userEntity.favourites.indexOf(favourite) === -1) {
                    userEntity.favourites.push(favourite);
                }
            });
        }
        if (user.username) {
            userEntity.username = user.username;
        }

        userEntity.save();
        user = userEntity.toObject();
        user.password = undefined;
        user.__v = undefined;
        return user;
    } else {
        return { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, error: ErrorMessages.USER_NOT_FOUND };
    }
}

export const deleteToken = async (token) => {
    return await UserTokenModel.deleteOne({ token });
}

export const findToken = async (token) => {
    return await UserTokenModel.findOne({ token });
}

export const saveToken = async (username, token) => {
    return await UserTokenModel.findOneAndUpdate(
        { username },
        { $set: { token } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
}