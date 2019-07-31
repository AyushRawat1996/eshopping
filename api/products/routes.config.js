const ProductController = require('./controllers/products.controller');
const CommonValidationMiddleware = require('../../common/middlewares/common.validation.middleware');

exports.routesConfig = function (app) {
    app.post('/products', [
        CommonValidationMiddleware.emptyBody, 
        ProductController.insert
    ]);

    app.get('/products', [
        ProductController.list
    ]);

    app.get('/products/:productId', [
        ProductController.getById
    ]);

    app.patch('/products/:productId', [
        CommonValidationMiddleware.emptyBody,
        ProductController.patchById
    ]);

    app.delete('/products/:productId', [
        ProductController.removeById
    ]);
};