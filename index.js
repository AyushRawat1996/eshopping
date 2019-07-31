const config = require('./common/config/env.config.js');
const express = require('express');
const ENV = require('./common/config/env.config')
const ProductImagesRouter = require('./api/product-images/routes.config')
const app = express();
const bodyParser = require('body-parser');
const appRouter = express.Router();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const ProductRouter = require('./api/products/routes.config');
const CartRouter = require('./api/cart/routes.config');
// const DeviceRouter = require('./devices/routes.config');
// const DeviceTypeRouter = require('./devices-types/routes.config');
// const TxRouter = require('./transactions/routes.config');


const store = new MongoDBStore({
    uri: ENV.mongoURI,
    collection: 'sessions'
});

app.use(session({
    secret: 'session_secret',
    resave: false,
    saveUninitialized: true,
    store: store,
    unset: 'destroy',
    name: 'sessionAuth'
}));


app.use('/uploads', express.static('assets/uploads'));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, Role-Id');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
ProductRouter.routesConfig(appRouter);
CartRouter.routesConfig(appRouter);
// ProductImagesRouter.routesConfig(appRouter)
app.use("/api/products/images", ProductImagesRouter);

// UsersRouter.routesConfig(appRouter);
// DeviceRouter.routesConfig(appRouter);
// DeviceTypeRouter.routesConfig(appRouter);

// TxRouter.routesConfig(appRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', appRouter);

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
