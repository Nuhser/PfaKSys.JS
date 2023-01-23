const router = require('express').Router();
let ItemCategory = require('../models/itemCategory.model');

// GET all item categories
router.route('/').get(async (req, res) => {
    let page = req.query.page;
    let limit = req.query.limit || 100;
    let name = req.query.name || '.*';

    await ItemCategory.find({ name: { $regex: name, $options: 'i' }})
        .limit(limit)
        .skip(page * limit)
        .collation({locale: 'de'})
        .sort({name: 'asc'})
        .then(categories => {
            if (categories.length === 0) {
                res.json({itemCategories: [], total: 0});
            }
            else {
                ItemCategory.count({})
                    .then(
                        count => res.json({itemCategories: categories, total: count})
                    ).catch(
                        err => res.status(400).json('Error: ' + err)
                    );
            }
        }).catch(err => res.status(400).json('Error: ' + err));
});

// POST new item category
router.route('/add').post((req, res) => {
    const name = req.body.name;

    const newItemCategory = new ItemCategory({
        name
    });

    newItemCategory.save()
        .then(
            (itemCategory) => res.json(
                {
                    id: itemCategory._id,
                    message: `New item category '${name}' was created!`,
                    itemCategory: itemCategory
                }
        )).catch(
            err => res.status(400).json('Error: ' + err)
        );
});

module.exports = router;