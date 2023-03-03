const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String, 
      required: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    deck: {
      type: Schema.Types.ObjectId,
      ref: 'Deck' 
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
