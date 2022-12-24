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

router.post('/favorited', (req, res) => {
    req.body.movieId


    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, info) => {
            if(err) return res.status(400).send(err)

            let result = false;
            if(info.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, favorited: result })
        })
})

module.exports = router;
