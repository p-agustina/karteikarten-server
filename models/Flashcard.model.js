const { Schema, model } = require("mongoose");

const flashcardSchema = new Schema (
    {
        germanWord: {
            type: String, 
            required: true
        },
        translation: {
            type: String,
            required: true
        },
        

    }
)