const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, _res, next) {
    if (!isNaN(req.params.id)) return next();
    return next(new Error('Invalid Id'));
}

router.get('/', async (req, res, next) => {
    try {
        const stickers = await queries.getAll();
        res.json(stickers);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', isValidId, async (req, res, next) => {
    try {
        const sticker = await queries.getOne(req.params.id);
        if (sticker) {
            res.json(sticker);
        } else {
            next();
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
