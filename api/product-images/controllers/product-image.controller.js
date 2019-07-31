const ProductImage = require("../models/product-image.model");
const mongoose = require("mongoose");

exports.list = async (req, res) => {
    ProductImage.find()
    .populate('product')
    .exec()
    .then(docs => {
      console.log(docs)
      const response = {
        count: docs.length,
        product_images: docs.map(doc => {
          return {
            product: doc.product,
            image: doc.image,
            _id: doc._id
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}


exports.add = (req, res, next) => {
    const productImage = new ProductImage({
      _id: new mongoose.Types.ObjectId(),
      product: req.body.product_id,
      image: req.file.path 
    });
    productImage
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Uploaded product image successfully",
          uploadedImage:
          {
              product: result.product,
              image_url: result.image,
              _id: result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }

exports.getById = (req, res, next) => {
    const id = req.params.imageId;
    ProductImage.findById(id)
      .select('product _id image')
      .populate('product')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product_image: doc
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }

exports.remove = (req, res, next) => {
    const id = req.params.imageId;
    ProductImage.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Product Image deleted'
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }