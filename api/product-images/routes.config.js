const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const env = require('../../common/config/env.config')
const ProductImage = require("./models/product-image.model");
const path = require('path')
const ProductImageController = require("./controllers/product-image.controller")


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './assets/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


router.get('/', [
  ProductImageController.list
]);

router.post("/", upload.single('image'), [
  ProductImageController.add
]);



router.get("/:imageId", [
  ProductImageController.getById
]);

// router.patch("/:productId", (req, res, next) => {
//   const id = req.params.productId;
//   const updateOps = {};
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value;
//   }
//   Product.update({ _id: id }, { $set: updateOps })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//           message: 'Product updated',
//           request: {
//               type: 'GET',
//               url: 'http://localhost:3000/products/' + id
//           }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

router.delete("/:imageId", [
  ProductImageController.remove
]);

module.exports = router;