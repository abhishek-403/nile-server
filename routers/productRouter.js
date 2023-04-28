const router = require('express').Router();
const productController = require('../controller/productController');
const { requireUser } = require('../middleware/requireUser');

router.get('/allproducts',requireUser,productController.allProducts)

module.exports= router;