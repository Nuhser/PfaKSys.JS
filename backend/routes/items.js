const router = require('express').Router();
let Item = require('../models/item.model');

// GET all items
router.route('/').get(async (req, res) => {
    let page = req.query.page;
    let limit = req.query.limit || 100;

    await Item.find()
        .limit(limit)
        .skip(page * limit)
        .collation({locale: 'de'})
        .sort({name: 'asc'})
        .then(items => {
            if (items.length === 0) {
                res.json({ items: [], total: 0});
            }
            else {
                Item.count({})
                    .then(
                        count => res.json({ items: items, total: count })
                    ).catch(
                        err => res.status(400).json('Error: ' + err)
                    );
            }
        }).catch(err => res.status(400).json('Error: ' + err));
});

// POST new item
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const no_quantity = req.body.no_quantity;
    const quantity = req.body.quantity;
    const condition = req.body.condition;
    const description = req.body.description;
    const images = req.body.images;
    const comments = req.body.comments;

    const newItem = new Item({
        name,
        no_quantity,
        quantity,
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
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE item by id
router.route('/:id').put((req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.name = req.body.name;
            item.no_quantity = req.body.no_quantity;
            item.quantity = req.body.quantity;
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