const Review = require('../models/reviewSchema');
const Product = require('../models/productSchema');
const Customer = require('../models/customerSchema');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { stars, review, customerId, productId } = req.body;

        const product = await Product.findById(productId);
        const customer = await Customer.findById(customerId);
        if (!product || !customer) {
            return res.status(404).json({ message: 'Product or Customer not found' });
        }

        const newReview = new Review({
            stars,
            review,
            customerId,
            productId
        });

        const savedReview = await newReview.save();
        res.status(201).json({ message: 'Review created successfully', review: savedReview });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get review by ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get review by ProductId
exports.getReviewByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }
        
        const review = await Review.find({ productId: productId });
        if (!review.length) {
            return res.status(404).json({ message: 'No review for this product' });
        }
        res.status(200).json(review);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get review by CustomerId
exports.getReviewByCustomerId = async (req, res) => {
    try {
        const { customerId } = req.params;
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        
        const review = await Review.find({ customerId: customerId });
        if (!review.length) {
            return res.status(404).json({ message: 'No review for this customer' });
        }
        res.status(200).json(review);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update review by ID
exports.updateReview = async (req, res) => {
    try {
        const { stars, review } = req.body;

        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            {
                stars,
                review
            },
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete review by ID
exports.deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};