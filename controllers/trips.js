const router = require('express').Router();
const { User } = require('../models');


router.get("/", (req, res) => {
    Playlist.findAll()
        .then(trip => res.status(200).json(trip))
        .catch(err => res.status(500).json({
            error: err
        }))
})

router.get("/:id", (req, res) => {
    Playlist.findOne({
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

    Trips.create(trips)
        .then(trips => res.status(200).json(trips))
        .catch(err => res.status(500).json({ error: err.message || serverErrorMsg }))
})

router.put("/:id", (req, res) => {
    const query = req.params.id;

    Trips.update(req.body,
        { where: { id: query } })
        .then((tripsUpdated) => {
            Trips.findOne({
                where: {
                    id: query
                }
            })
                .then((locatedUpdatedTrips) => {
                    res.status(200).json({
                        trip: locatedUpdatedTrips,
                        message: "Trip successfully updated",
                        tripChanged: tripsUpdated,
                    });
                })
        })
        .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {

    Trips.destroy({
        where: { id: req.params.id }
    })
        .then(trip => res.status(200).json(trip))
        .catch(err => res.status(500).json(err))
})

module.exports = router