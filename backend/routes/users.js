const router = require('express').Router();
let User = require('../models/user.model');

// GET all users
router.route('/').get(async (req, res) => {
    let page = req.query.page;
    let limit = req.query.limit || 100;

    await User.find()
        .limit(limit)
        .skip(page * limit)
        .sort({username: 'asc'})
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET user by id
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE user by id
router.route('/:id').put((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.name = req.body.name;
            user.email = req.body.email;
            
            user.save()
                .then(() => res.json(`User '${user.name}' was updated!`))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE user by id
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json(`User '${req.params.id}' was deleted!`))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST new user
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;

    const newUser = new User({
        username,
        email
    });

    newUser.save()
        .then(
            (user) => res.json(
                {
                    id: user._id,
                    message: `New user '${username}' was created!`,
                    user: user
                }
        )).catch(
            err => res.status(400).json('Error: ' + err)
        );
});

module.exports = router;