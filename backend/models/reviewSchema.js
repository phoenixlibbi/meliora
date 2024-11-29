const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    stars: {
        type: Number,
        required: [true, 'Review stars is required'],
        min: [1, 'Review stars must be at least 1 star'],
        max: [5, 'Review stars must be at most 5 stars']
    },
    review: {
        type: String,
        trim: true,
        required: [true, 'Review text is required'],
        minlength: [1, 'Review must be at least 1 character'],
        maxlength: [500, 'Review must not exceed 500 characters']
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, { 
    timestamps: true
});

reviewSchema.index({ customerId: 1, productId: 1 }, { unique: false });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;