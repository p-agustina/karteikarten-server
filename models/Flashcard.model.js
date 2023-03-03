const { Schema, model } = require("mongoose");

const flashcardSchema = new Schema({
  germanWord: {
    type: String,
    required: true,
  },
  translation: {
    type: String,
    required: true,
  },
  deck: {
    type: Schema.Types.ObjectId,
    ref: "Deck",
  },
  box: {
    type: Number,
  },
  lastReviewDate: {
    type: Date,
  },
  lastReviewResult: {
    type: String,
    enum: ["correct", "incorrect"],
  }
});

const Flashcard = model("Flashcard", flashcardSchema);

module.exports = Flashcard;
