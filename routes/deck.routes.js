const express = require("express");
const router = express.Router();
const Deck = require("../models/Deck.model");
const Flashcard = require("../models/Flashcard.model");
const User = require("../models/User.model");

const { isAuthenticated } = require("./../middleware/jwt.middleware.js");


router.post("/create-deck", (req, res, next) => {
    const {name, description} = req.body;

    Deck.create({name, description})
    .then(createdDeck=>{
      User.findByIdAndUpdate(createdDeck._id, {deck: createdDeck._id})
      .then(() => {
        console.log(createdDeck)
      })
    })
});

router.get("/decks", (req, res, next) => {
    Deck.find()
    .then((decksFound) => {
        res.json(decksFound)
    })
    .catch((err)=>console.log(err))
});

router.post("/flashcard", (req, res, next) => {
    const {germanWord, translation, deckId} = req.body

    Flashcard.create({germanWord, translation, box: 1})
    .then(newCard => {
      Deck.findByIdAndUpdate(deckId, {$push: {flashcards: newCard}})
      .then(() => {})
    })
    .catch((err) => console.log(err));
});



module.exports = router;