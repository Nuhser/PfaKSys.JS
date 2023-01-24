const router = require('express').Router();
let ItemCategory = require('../models/itemCategory.model');

function createItemCategoryFilter(request) {
    let itemCategoryFilter = {$and: []};

    if (request.query.name) {
        itemCategoryFilter.$and.push({name: {$regex: request.query.name, $options: 'i'}});
    }

    if (itemCategoryFilter.$and.length < 1) {
        delete itemCategoryFilter.$and;
    }

    return itemCategoryFilter;
}

// GET all item categories
router.route('/').get(async (req, res) => {
    let page = req.query.page;
    let limit = req.query.limit || 100;
    let categoryFilter = createItemCategoryFilter(req);

    await ItemCategory.find(categoryFilter)
        .limit(limit)
        .skip(page * limit)
        .collation({locale: 'de'})
        .sort({name: 'asc'})
        .then(categories => {
            if (categories.length === 0) {
                res.json({itemCategories: [], total: 0, filter: categoryFilter});
            }
            else {
                ItemCategory.count(categoryFilter)
                    .then(
                        count => res.json({itemCategories: categories, total: count, filter: categoryFilter})
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