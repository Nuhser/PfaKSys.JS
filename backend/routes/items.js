const router = require('express').Router();
let Item = require('../models/item.model');

function createItemFilter(request) {
    let itemFilter = {$and: []};

    if (request.query.name) {
        itemFilter['$and'].push({name: {$regex: request.query.name, $options: 'i'}});
    }

    if (request.query.inventory_id) {
        itemFilter['$and'].push({inventory_id: {$regex: request.query.inventory_id, $options: 'i'}});
    }
    else {
        itemFilter['$and'].push({$or: [{inventory_id: {$exists: false}}, {inventory_id: {$regex: '.*'}}]});
    }

    if (request.query.no_quantity) {
        itemFilter['$and'].push({no_quantity: request.query.no_quantity});
    }

    if (request.query.quantity_min) {
        itemFilter['$and'].push({quantity: {$gte: request.query.quantity_min}});
    }

    if (request.query.quantity_max) {
        itemFilter['$and'].push({quantity: {$lte: request.query.quantity_max}});
    }

    if (request.query.categories) {
        itemFilter['$and'].push({category: {$in: request.query.categories.split(',')}});
    }

    if (request.query.conditions) {
        itemFilter['$and'].push({condition: {$in: request.query.conditions.split(',')}});
    }

    if (request.query.description) {
        itemFilter['$and'].push({description: {$regex: request.query.description, $options: 'i'}});
    }

    return itemFilter;
}

// GET all items
router.route('/').get(async (req, res) => {
    let page = req.query.page;
    let limit = req.query.limit || 100;
    let itemFilter = createItemFilter(req);

    await Item.find(itemFilter)
        .limit(limit)
        .skip(page * limit)
        .collation({locale: 'de'})
        .sort({name: 'asc'})
        .then(items => {
            if (items.length === 0) {
                res.json({ items: [], total: 0, filter: itemFilter });
            }
            else {
                Item.count(itemFilter)
                    .then(
                        count => res.json({ items: items, total: count, filter: itemFilter })
                    ).catch(
                        err => res.status(400).json('Error: ' + err)
                    );
            }
        }).catch(err => res.status(400).json('Error: ' + err));
});

// POST new item
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const inventory_id = req.body.inventory_id;
    const no_quantity = req.body.no_quantity;
    const quantity = req.body.quantity;
    const category = req.body.category;
    const condition = req.body.condition;
    const description = req.body.description;
    const images = req.body.images;
    const comments = req.body.comments;

    const newItem = new Item({
        name,
        inventory_id,
        no_quantity,
        quantity,
        category,
        condition,
        description,
        images,
        comments
    });

    newItem.save()
        .then(
            (item) => res.json(
                {
                    id: item._id,
                    message: `New item '${name}' was created!`,
                    item: item
                }
        )).catch(
            err => res.status(400).json('Error: ' + err)
        );
});

// GET total item count
router.route('/count').get(async (req, res) => {
    await Item.count({})
        .then(
            count => res.json({ total: count })
        ).catch(
            err => res.status(400).json('Error: ' + err)
        );
});

// GET item by id
router.route('/:id').get((req, res) => {
    Item.findById(req.params.id)
        .populate('category', 'name')
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE item by id
router.route('/:id').put((req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.name = req.body.name;
            item.inventory_id = req.body.inventory_id;
            item.no_quantity = req.body.no_quantity;
            item.quantity = req.body.quantity;
            item.category = req.body.category;
            item.condition = req.body.condition;
            item.description = req.body.description;
            item.images = req.body.images;
            item.comments = req.body.comments;

            item.save()
                .then(() => res.json(`Item '${item.name}' was updated!`))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE item by id
router.route('/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json(`Item '${req.params.id}' was deleted!`))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;