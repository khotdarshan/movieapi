import config from './config/environment';
import * as mongo from './startup/mongo';
const app = require('./startup/express').default();
require('./api/common/middleware').default(app);
require('./startup/routes').default(app);
mongo.connect();
const server = app.listen(config.port, () => console.log(`Movie DB api service listening on port ${config.port}`));
export default server;