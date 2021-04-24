import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../.env' });

module.exports = {
    tokenSecretKey: process.env.TOKEN_SECRET_KEY,
    path: {
        movie: process.env.MOVIE_PATH,
        user: process.env.USER_PATH,
        auth: process.env.AUTH_PATH
    },
    port: process.env.PORT,
    corsoptions: {
        origin: `${process.env.CORSURL}`,
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token,x-client-secret, Authorization'
    },
    whiteListUrls: Object.assign({},
        ...(
            process.env.WHITE_LIST_URLS.split(',')
                .map(urlSource => {
                    const [url, method] = urlSource.split('-');
                    return { [url]: method };
                })
        )
    ),
    mongo: {
        uri: `${process.env.MONGODB_PROTOCOL}://${process.env.MONGODB_IP}:${process.env.MONGODB_DEFAULT_PORT}${process.env.MONGODB_MOVIE_HOST}`,
        options: {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    }
}