const router = require('express').Router();
const { Trip } = require('../models');


router.get("/", (req, res) => {
    Trip.findAll()
        .then(trip => res.status(200).json(trip))
        .catch(err => res.status(500).json({
            error: err
        }))
})

router.get("/:id", (req, res) => {
    Trip.findOne({
        where: {
            id: req.params.id
        }
    })

        .then(trip => res.status(200).json(trip))
        .catch(err => res.status(500).json({
            error: err
        }))
})

router.post('/createtrip', (req, res) => {

    const trips = {
        To: req.body.To,
        From: req.body.From,
        Date: req.body.Date,
        Flying: req.body.Flying,
        Driving: req.body.Driving
    };

    Trip.create(trips)
        .then(trips => res.status(200).json(trips))
        .catch(err => res.status(500).json({ error: err.message || serverErrorMsg }))
})

router.put("/:id", (req, res) => {
    const query = req.params.id;

    Trip.update(req.body,
        { where: { id: query } })
        .then((tripUpdated) => {
            Trip.findOne({
                where: {
                    id: query
                }
            })
                .then((locatedUpdatedTrip) => {
                    res.status(200).json({
                        trip: locatedUpdatedTrip,
                        message: "Trip successfully updated",
                        tripChanged: tripUpdated,
                    });
                })
        })
        .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {

    Trip.destroy({
        where: { id: req.params.id }
    })
        .then(trip => res.status(200).json(trip))
        .catch(err => res.status(500).json(err))
})

module.exports = router