const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
    required: [true, "User email required"],

    unique: true,
  },

  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "Friend",
    },
  ],
  toJSON: {
    virtuals: true,
  },
  id: false,
});

userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length}`;
});

userSchema.path("email").validate(async (email) => {
  const emailCount = await mongoose.models.User.countDocuments({ email });
  return !emailCount;
}, "Email Already Exists");

const User = model("user", userSchema);

module.exports = User;
