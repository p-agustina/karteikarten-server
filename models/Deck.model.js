const { Schema, model } = require("mongoose");

const deckSchema = new Schema (
    {
        name: {
            type: String
        },
        description: {
            type: String,
            required: false
        },
        flashcards: [{ 
            type: Schema.Types.ObjectId,
            ref: 'Flashcard' 
        }],
        numberOfCards: {
            type: Number
        }
    },
    {
        timestamps: true
      }
);

const Deck = model("Deck", deckSchema);

module.exports = Deck;