const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/', customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.get('/email/:email', customerController.getCustomerByEmail);
router.put('/:id', customerController.updateCustomer);
router.put('/updateAddress/:email', customerController.updateAddress);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;