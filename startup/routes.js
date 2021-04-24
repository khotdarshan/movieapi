import express from 'express';
import movie from '../api/movieRouter';
import user from '../api/userRouter';
import auth from '../api/authRouter';
import config from '../config/environment';

export default function (app) {
    app.use(express.json());
    app.use(config.path.movie, movie);
    app.use(config.path.user, user);
    app.use(config.path.auth, auth);
}