const { Schema, model } = require("mongoose");

const flashcardSchema = new Schema({
  germanWord: {
    type: String,
    required: true,
  },
  translation: {
    type: String,
    required: true,
    unique: true
  },
  // deck: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Deck",
  // },
  box: {
    type: Number,
    min: 1,
    max: 7
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
