const { Schema, model } = require("mongoose");

const deckSchema = new Schema (
    {
        flashcards: [
         { 
            type: Schema.Types.ObjectId,
            ref: 'Flashcard' 
        }
    ],
    }
)

const Deck = model("Deck", deckSchema);

module.exports = Deck;