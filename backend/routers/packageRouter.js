const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const upload = require('../middlewares/uploadPackageImage');

router.post('/', upload.single('image'), packageController.createPackage);
router.get('/', packageController.getAllPackages);
router.get('/:id', packageController.getPackageById);
router.put('/:id', upload.single('image'), packageController.updatePackage);
router.delete('/:id', packageController.deletePackage);

module.exports = router;