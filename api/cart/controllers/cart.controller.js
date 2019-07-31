const CartModel = require('../models/cart.model');
const mongoose = require('mongoose');
exports.add = async (req, res) => {
    try {
        let result = await CartModel.checkExistingCart(req)
        if (result && result.id) {
            // update the existing row
            console.log("already there")
            // res.status(400).send({ error: "This product is already there in the database." });
        } 
        else {
            // add new row
            
            let resp = await CartModel.createNewRecord(req)
            res.send(resp)
            // try {
            //     req.body.price = parseFloat(req.body.price)
            //     let result = await ProductModel.add(req.body);
            //     res.status(201).send(result);
            // } catch (err) {
            //     res.status(400).send({ error: "Error inserting new product in database.", err });
            // }
        }
    } catch (err) {
        res.status(400).send({ error: "Invalid Request" });
    }
};




// updateExisting() {

// }


// exports.list = (req, res) => {
//     let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
//     let page = 0;
//     if (req.query) {
//         if (req.query.page) {
//             req.query.page = parseInt(req.query.page);
//             page = Number.isInteger(req.query.page) ? req.query.page : 0;
//         }
//     }
//     ProductModel.list(limit, page)
//         .then((result) => {
//             res.status(200).send(result);
//         })
//         .catch(err => {
//             res.status(500).send(err)
//         })
// };

// exports.getById = (req, res) => {
//     ProductModel.findById(req.params.productId)
//         .then((result) => {
//             res.status(200).send(result);
//         })
//         .catch(err => {
//             res.status(500).send(err)
//         })
// };

// exports.patchById = (req, res) => {
//     // req.body.updatedBy = req.jwt.userId
    
//     ProductModel.patchProduct(req.params.productId, req.body)
//         .then((result) => {
//             res.status(200).send(result)
//         })
//         .catch(err => {
//             res.status(500).send(err)
//         })
// };

// exports.removeById = (req, res) => {
//     if(req.params.productId)
//     ProductModel.removeById(req.params.productId)
//         .then((result) => {
//             res.status(200).send(result)
//         })
//         .catch(err => {
//             res.status(500).send(err)
//         })
// };