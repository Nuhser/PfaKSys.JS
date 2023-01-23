const mongoose = require('mongoose');

const itemCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    }
},
{
    timestamps: true
});

const ItemCategory = mongoose.model('ItemCategory', itemCategorySchema)
module.exports = ItemCategory;