const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, "Must be at least 1, got {VALUE}"],
      maxlength: [280, "Cannot be more than 280, got {VALUE}"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) {
          const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            dayPeriod: "narrow",
          };
          return date.toLocaleDateString(undefined, options);
        }
      },
    },
    //use getter method for date formatting
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return `${this.reactions.length}`;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
