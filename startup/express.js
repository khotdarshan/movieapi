import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '../config/environment';

export default function () {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors(config.corsoptions));
    app.use(bodyParser.urlencoded({ extended: false }));
    return app;
}