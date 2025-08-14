const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firebaseUID: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: function() { return !this.firebaseUID; } // Password is not required if using Firebase Auth
    },
    interviewList: [
      {
        type: Schema.Types.ObjectId,
        ref: "MockInterview",
      }
    ]
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);
module.exports = UserModel;