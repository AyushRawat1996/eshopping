const mongooseConnect = require('../../../common/config/connect.config');
const mongoose = mongooseConnect.connect();

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },//{ type: String, required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model('ProductImage', productSchema);