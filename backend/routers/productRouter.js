const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { uploadMultiple, multerErrorHandler } = require('../middlewares/uploadProductImages');

router.post('/', uploadMultiple, productController.createProduct, multerErrorHandler);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id',uploadMultiple, productController.updateProduct,multerErrorHandler);
router.delete('/:id', productController.deleteProduct);
router.get('/usage/:id', productController.getProductUsage);
router.put('/usage/:id', productController.updateProductUsage);

module.exports = router;