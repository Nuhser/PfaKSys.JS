const mongoose = require('mongoose');
let ItemCategory = require("../models/itemCategory.model");

const ItemCondition = ['UNKNOWN', 'GOOD', 'OK', 'MOSTLY_OK', 'DAMAGED', 'IN_REPAIR', 'UNHYGIENIC', 'OTHER'];

// TODO: Add category and location.
// Follow this system: https://stackoverflow.com/questions/43159336/what-to-do-with-enum-values-in-mongoose
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    inventory_id: {
        type: String,
        unique: true,
        trim: true,
        maxlength: 32,
        default: null
    },
    no_quantity: {
        type: Boolean,
        required: true,
        default: false
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemCategory',
        validate: {
            isAsync: true,
            validator: function(arg) {
                return ItemCategory.findById(arg)
                    .then(category => category != null)
                    .catch(false);
            },
            message: `'{VALUE}' is not a valid item category ID.`
        },
        default: null
    },
    condition: {
        type: String,
        required: true,
        enum: {
            values: ItemCondition,
            message: 'Invalid item condition ({VALUE}). Please use one of the following: ' + ItemCondition.join(', ')
        },
        default: 'UNKNOWN'
    },
    description: {
        type: String,
        maxlength: 1000,
        default: null
    },
    images: {
        type: [String]
    },
    comments: {
        type: [itemCommentSchema]
    }
},
{
    timestamps: true
});

var itemCommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    likes: {
        type: Number,
        min: 0,
        default: 0
    },
    comments: {
        type: [itemCommentSchema]
    }
},
    {
        timestamp: true
    });

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;