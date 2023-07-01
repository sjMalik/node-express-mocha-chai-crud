const debug = require('debug')('server:sticker');
const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, _res, next) {
    if (!req.params.id.isNaN) return next();
    return next(new Error('Invalid Id'));
}

function isValidSticker(sticker) {
    const isValidTitle = typeof sticker.title === 'string' && sticker.title.trim() !== '';
    const isValidUrl = typeof sticker.url === 'string' && sticker.url.trim() !== '';
    return isValidTitle && isValidUrl;
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

router.post('/', async (req, res, next) => {
    debug(req.body);
    try {
        if (isValidSticker(req.body)) {
            const repsonse = await queries.create(req.body);
            res.json(repsonse[0]);
        } else {
            throw new Error('Not a valid sticker');
        }
    } catch (e) {
        next(e);
    }
});

router.put('/:id', isValidId, async (req, res, next) => {
    try {
        if (isValidSticker(req.body)) {
            const response = await queries.update(req.params.id, req.body);
            res.json(response[0]);
        } else {
            throw new Error('Not a valid request');
        }
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', isValidId, async (req, res, next) => {
    try {
        await queries.delete(req.params.id);
        res.status(200).end();
    } catch (e) {
        next(e);
    }
});

module.exports = router;
