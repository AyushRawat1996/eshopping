const CartController = require('./controllers/cart.controller');
const CommonValidationMiddleware = require('../../common/middlewares/common.validation.middleware');
const SessionMiddleware = require('../../common/middlewares/session.validation.middleware');
 
exports.routesConfig = function (app) {
    app.post('/cart', [
        CommonValidationMiddleware.emptyBody,
        SessionMiddleware.sessionExists,
        CartController.add
    ]);

    // app.get('/cart', [
    //     ProductController.list
    // ]);

    // app.get('/cart/:productId', [
    //     ProductController.getById
    // ]);

    // app.patch('/cart/:productId', [
    //     CommonValidationMiddleware.emptyBody,
    //     ProductController.patchById
    // ]);

    // app.delete('/cart/:productId', [
    //     ProductController.removeById
    // ]);
};