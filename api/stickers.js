const express = require('express');
const router = express.Router();

const queries = require('../db/queries');

router.get('/', async (req, res, next)=> {
    try{
        const stickers = await queries.getAll();
        res.json(stickers)
    }catch(e){
        next(e)
    }
})

module.exports = router;