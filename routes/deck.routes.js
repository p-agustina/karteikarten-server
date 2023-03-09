const express = require("express");
const { findByIdAndUpdate } = require("../models/Deck.model");
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
    console.log('este es', req.body)
    Deck.find()
    .populate("flashcards")
    .then((decksFound) => {
        res.json(decksFound)
    })
    .catch((err)=>console.log(err))
});

//EDIT THE DECK

router.post("/edit/:deckId", (req, res, next) => {
    const deckId = req.params.deckId
    const {name, description} = req.body;
    console.log(req.body)

    Deck.findByIdAndUpdate(deckId, {name, description}, {new: true})
    .then(() => {})
    .catch((err) => console.log(err));

});

//DELETE FLASHCARDS

router.delete("/flashcards/:flashcardId", (req, res, next) => {
    const {flashcardId} = req.params;

    Flashcard.findByIdAndRemove(flashcardId)
    .then((deletedItem) => {
        Deck.findOneAndUpdate({ flashcards: { "$in" : [deletedItem._id]}}, {$pull: {flashcards: deletedItem._id}})
        .then(() => console.log("funciono"))
    })
    .catch(err => res.json(err));
});

//ADD A FLASHCARD ROUTE

router.post("/flashcard", (req, res, next) => {
    const {germanWord, translation,deckId} = req.body
    Flashcard.create({germanWord, translation, deckId, box: 1})
    .then(newCard => {
       return Deck.findByIdAndUpdate(deckId, {$push: {flashcards: newCard._id}}, {new: true})
    })
    .then(response => console.log(response))
    .catch(err => res.json(err));
});

router.get("/flashcards", (req, res, next) => {
    Flashcard.find()
    .then((flashcardsFound) => {
        res.json(flashcardsFound)
    })
    .catch((err)=>console.log(err))
});



module.exports = router;