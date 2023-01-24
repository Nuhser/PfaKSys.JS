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
                        err => res.status(400).json(err)
                    );
            }
        }).catch(err => res.status(400).json(err));
});

// POST new item category
router.route('/add').post((req, res) => {
    const name = req.body.name;

    const newItemCategory = new ItemCategory({
        name
    });

    newItemCategory.save()
        .then(
            category => res.status(201).json(
                {
                    id: category._id,
                    message: `New item category '${name}' was created!`,
                    itemCategory: category
                }
        )).catch(
            err => res.status(400).json(err)
        );
});

// GET total item category count
router.route('/count').get(async (req, res) => {
    let categoryFilter = createItemCategoryFilter(req);

    await ItemCategory.count(categoryFilter)
        .then(
            count => res.json({total: count, filter: categoryFilter})
        ).catch(
            err => res.status(400).json(err)
        );
});

// GET item category by id
router.route('/:id').get((req, res) => {
    ItemCategory.findById(req.params.id)
        .then(
            category => {
                if (category === null) {
                    res.status(404).json({name: 'IdNotFoundError', value: req.params.id, message: `No item category with the ID '${req.params.id}' found.`});
                }
                else {
                    res.json(category);
                }
            }
        ).catch(
            err => res.status(400).json(err)
        );
});

// UPDATE item category by id
router.route('/:id').put((req, res) => {
    ItemCategory.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after', runValidators: true})
        .then(
            category => {
                if (category === null) {
                    res.status(404).json({name: 'IdNotFoundError', value: req.params.id, message: `No item category with the ID '${req.params.id}' found.`});
                }
                else {
                    res.json(category);
                }
            }
        ).catch(
            err => res.status(400).json(err)
        );
});

// DELETE itemcategory by id
router.route('/:id').delete((req, res) => {
    ItemCategory.findByIdAndRemove(req.params.id)
        .then(category => {
            if (category === null) {
                res.status(404).json({name: 'IdNotFoundError', value: req.params.id, message: `No item category with the ID '${req.params.id}' found.`});
            }
            else {
                res.json(
                    {
                        id: category._id,
                        message: `Item category '${category.name}' was deleted!`,
                        itemCategory: category
                    }
                );
            }
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;