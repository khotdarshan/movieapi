import { HTTP_STATUS, ErrorMessages } from '../api/common/constant';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/environment';

export const responseWrapper = (res, data, statusCode, errorMessage) => {
    statusCode = statusCode || HTTP_STATUS.OK;
    if (statusCode === HTTP_STATUS.OK) {
        res.status(statusCode).json(data);
    } else {
        res.status(statusCode).json({ error: errorMessage });
    }
}

export const comparePassword = async (passwordA, passwordB) => {
    return await bcrypt.compare(passwordA, passwordB);
}

export const generateToken = async (username, password) => {
    return jwt.sign({ username, password: await generateHash(password) }, config.tokenSecretKey);
}

export const verifyToken = async (token) => {
    return jwt.verify(token, config.tokenSecretKey);
}

export const getTokenFromHeader = (req) => {
    const authHeader = req.headers.authorization;
    return authHeader ? authHeader.split(' ')[1] : '';
}

export const generateHash = async (string) => {
    return await bcrypt.hash(string, 10);
}

export const checkTokenExpiry = async (token) => {
    if (!token) {
        return { error: ErrorMessages.INVALID_TOKEN, statusCode: HTTP_STATUS.ACCESS_DENIED };
    }
    const updatedAt = new Date(token.updatedAt);
    const current = new Date();
    return { isTokenExpired: current - updatedAt > 3600000 };
}