// Require Mongoose
const { Schema, model } = require("mongoose");

//Define new schema for User
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      //Validation for email
      validate: {
        validator: function (v) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
      required: [true, "User email required"],

      unique: true,
    },
    // Array of ID valus referencing Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    // Array of ID valus referencing User model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
//virtual to count the number of friends
userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length}`;
});

//Initialize User Model
const User = model("user", userSchema);

//Export User Model
module.exports = User;
