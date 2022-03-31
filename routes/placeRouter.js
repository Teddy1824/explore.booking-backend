const express = require("express");
const router = express.Router();
const placesModels = require("../models/places")

// Get all blog posts
router.get("/", async (req, res) => {
    try {
      const places = await placesModels.find();
      res.json(places);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// Get single Blog
router.get("/:id", getPlaces, (req, res) => {
  res.send(req.places);
});

// Create Blog
router.post("/", async (req, res) => {
  const places = new placesModels({
    place: req.body.place,
    location: req.body.location,
    description: req.body.description,

    price: req.body.price,
    category: req.body.category,
    img: req.body.img,
  });
  try {
    const newPlaces = await places.save();
    res.status(201).json(newPlaces);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update blog
router.patch("/:id", getPlaces, async (req, res) => {
  if (req.body.place != null) {
    res.places.place = req.body.place;
  }
  if (req.body.price != null) {
    res.places.price = req.body.price;
  }
  if (req.body.location != null) {
    res.places.location = req.body.location;
  }
  if (req.body.img != null) {
    res.places.img = req.body.img;
  }
  if (req.body.description != null) {
    res.places.description = req.body.description;
  }
  if (req.body.catergory != null) {
    res.places.catergory = req.body.catergory;
  }
  try {
    const updatedPlace = await res.places.save();
    res.json(updatedPlace);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Blog
router.delete("/:id", getPlaces, async (req, res) => {
  try {
    await res.places.remove();
    res.json({ message: "Place Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPlaces(req, res, next) {
  let places;
  try {
    places = await placesModels.findById(req.params.id);
    if (places == null) {
      return res.status(404).json({ message: "Cannot find place" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.places = places;
  next();
}
module.exports = router;