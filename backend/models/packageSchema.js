const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Package name is required'],
        trim: true,
        minlength: [3, 'Package name must be at least 3 characters long'],
        maxlength: [100, 'Package name must not exceed 100 characters']
    },
    details: {
        type: String,
        required: [true, 'Details is required'],
        trim: true,
        minlength: [3, 'Details must be at least 10 characters long'],
    },
    subDetails: {
        type: String,
        required: [true, 'Sub-Details is required'],
        trim: true,
        minlength: [3, 'Sub-Details must be at least 10 characters long'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [3, 'Description must be at least 10 characters long'],
    },
    subDescription: {
        type: String,
        required: [true, 'Sub-Description is required'],
        trim: true,
        minlength: [3, 'Sub-Description must be at least 10 characters long'],
    },
    size: {
        type: String,
        required: [true, 'Package type is required'],
        enum: ['Small', 'Medium', 'Large','Extra Large']
    },
    type: {
        type: String,
        required: [true, 'Package type is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [1, 'Price must be greater than 0']
    },
    image: {
        type: String,
        required: [true, 'Package image is required'],
        trim: true
    },
    products: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        ],
        validate: {
            validator: function (value) {
                return value.length >= 3;
            },
            message: 'A package must contain at least 3 products.'
        }
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;