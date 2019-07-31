const mongooseConnect = require('../../../common/config/connect.config');
const mongoose = mongooseConnect.connect();
const Schema = mongoose.Schema;
 
const CartSchema = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
    quantity: { type: Number },
    session: {type: String, ref: 'sessions', required: true},
    createdBy: {type: String},
    updatedBy: {type: String},
}, {
    timestamps: true
  });

  CartSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
CartSchema.set('toJSON', {
    virtuals: true
});

CartSchema.findById = function (cb) {
    return this.model('Carts').find({id: this.id}, cb);
};

const Cart = mongoose.model('Carts', CartSchema);


exports.findById = (id) => {
    return Cart.findById(id)
        .then((result) => {
            result = result.toJSON();
            return result;
        });
};

exports.checkExistingCart = (req) => {
    Cart.find().exec((function (err, res) {
        if (err) {
            console.log(err)
        } else {
            console.log("res", res)
        }
    }))
    //  {
    //     return Cart.find({product: req.body.product, session: req.session.id})
    // .then((result) => {
    //     return result;
    // })
    // .catch(err => {
    //     console.log(err)
    // })
    // }
    
}

exports.createNewRecord = async (req) => {
    const cartRow = new Cart({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.product,
        quantity: req.body.quantity,
        session: req.session.id,
        createdBy: req.session.id,
      });
    return new Promise((resolve, reject) => {
        cartRow.save((err, res) => { 
            if (err) 
                return reject(err); 
            else{
                return resolve(res); 
            } 
        }); 
    });
}
// exports.add = (newProduct) => {
//     const product = new Product(newProduct);
//     return new Promise((resolve, reject) => {
//         product.save((err, res) => { 
//             if (err) 
//                 return reject(err); 
//             else{ 
//                 res = res.toJSON(); 
//                 return resolve(res); 
//             } 
//         }); 
//     });
// };

// exports.findByName = (name) => {
//     return Product.find({name: name})
//         .then((result) => {
//             return result;
//         });
// }

// exports.list = (perPage, page) => {
//     return new Promise((resolve, reject) => {
//         Product.find()
//             .sort({createdAt: -1})
//             .limit(perPage)
//             .skip(perPage * page)
//             .exec(function (err, products) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(products);
//                 }
//             })
//     });
// };

// exports.patchProduct = (id, updatedProduct) => {
//     return new Promise((resolve, reject) => {
//         Product.findById(id, function (err, product) {
//             if (err) reject(err);
//             for (let i in product) {
//                     product[i] = updatedProduct[i];
//             }
//             product.save(function (err, saved) {
//                 if (err) return reject(err);
//                 resolve(saved);
//             });
//         });
//     })
// };

// exports.removeById = (id) => {
//     return new Promise((resolve, reject) => {
//         Product.deleteOne({_id: id}, (err, res) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(res);
//             }
//         });
//     });
// };
