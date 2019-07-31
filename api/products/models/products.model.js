const mongooseConnect = require('../../../common/config/connect.config');
const mongoose = mongooseConnect.connect();
const Schema = mongoose.Schema; 

const productSchema = new Schema({
    name: { type: String, required: true, trim: true },
    price: {type: Number, required: true},
    total_quantity: { type: Number },
    description: {type: String},
    createdBy: {type: String},
    updatedBy: {type: String},
}, {
    timestamps: true
  });

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
productSchema.set('toJSON', {
    virtuals: true
});

productSchema.findById = function (cb) {
    return this.model('Products').find({id: this.id}, cb);
};

const Product = mongoose.model('Products', productSchema);


exports.findById = (id) => {
    return Product.findById(id)
        .then((result) => {
            result = result.toJSON();
            return result;
        });
};

exports.add = (newProduct) => {
    const product = new Product(newProduct);
    return new Promise((resolve, reject) => {
        product.save((err, res) => { 
            if (err) 
                return reject(err); 
            else{ 
                res = res.toJSON(); 
                return resolve(res); 
            } 
        }); 
    });
};

exports.findByName = (name) => {
    return Product.find({name: name})
        .then((result) => {
            return result;
        });
}

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Product.find()
            .sort({createdAt: -1})
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, products) {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
    });
};

exports.patchProduct = (id, updatedProduct) => {
    return new Promise((resolve, reject) => {
        Product.findById(id, function (err, product) {
            if (err) reject(err);
            for (let i in product) {
                    product[i] = updatedProduct[i];
            }
            product.save(function (err, saved) {
                if (err) return reject(err);
                resolve(saved);
            });
        });
    })
};

exports.removeById = (id) => {
    return new Promise((resolve, reject) => {
        Product.deleteOne({_id: id}, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};
