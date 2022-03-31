const express = require("express")
const reservation = require("../models/res.model")
const placeM = require('../models/places.model')
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const allPlaces = await placeM.find()
        res.status(200).json({ msg: "Yeey, you have found the places", results: allPlaces})
        } catch (err) {
            res.status(500).json({ message: err.message})
        }
  })
// router.get("/", async (req, res) => {
//     try {
//         const places = await placeM.find();
//         res.json(places);
//     } catch (err) {
//         res.status(500).json({ msg: err.msg })
//     }
// });

router.get("/:id", getPlaces, (req, res) => {
    res.send(places);
});

router.post("/", async (req, res) => {
    const places = new placeM ({
        place: req.body.place,
        location: req.body.location,
        img: req.body.img,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
    });

    try {
        const newPlace = await places.save();
        res.status(201).json(newPlace);
    } catch (err) {
        res.status(400).json({msg: err})
    }   
    // places.push(place);
    // res.send(place);
});

router.put("/:id", (req, res) => {
    const places = places.find(c => c.id == parseInt(req.params.id));
    if (!places) res.status(404).send({ msg:'The requested place is not found.' })
    places.place = req.body.place;
    return res.send(places);
});

router.delete("/:id", getPlaces, async (req, res) => {
    try{
        await res.allPlaces.remove();
        res.json({ msg: "Place removed successfully." });
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }
})

async function getPlaces(req, res, next) {
    let places;
    try {
        places = await placeM.findById(req.params.id);
        if (places == null) {
            return res.status(404).json({ msg: "Cannot find place" });
        } 
    } catch (err) {
        return res.status(500).json({ msg: err.msg});
    }

    res.places = places;
    next();
} 

module.exports = router;

