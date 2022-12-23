const express = require('express');
const { Favorite } = require('../models/Favorite');
const router = express.Router();

router.post('/favoriteNumber', (req, res) => {
    req.body.movieId


    Favorite.find({ "movieId": req.body.movieId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)

            res.status(200).json({ success: true, favoritenumber: info.length})
        })
})

module.exports = router;
