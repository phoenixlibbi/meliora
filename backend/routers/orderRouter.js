const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.neworder);
router.get('/', orderController.getAllOrders);
router.get('/revenue', orderController.getRevenue);
router.get('/top-selling',orderController.topSellingProduct);
router.get('/line',orderController.lineStats);
router.get('/bar',orderController.barStats);
router.get('/:id', orderController.getOrderById);
router.get('/:email', orderController.getOrderByCustomerEmail);
router.get('/customer/:customerId', orderController.getOrderByCustomerId);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;