import mongoose from 'mongoose';
import config from '../config/environment';

export const connect = () => {
    mongoose
        .connect(config.mongo.uri, config.mongo.options)
        .then(() => console.log("Connected to MongoDB...", config.mongo.uri))
        .catch(err => {
            console.error("Could not connect to MongoDB...", config.mongo.uri, err);
            close();
        });
}

export const close = () => {
    mongoose
        .disconnect();
}