//Require mongoose
const { Schema, model } = require("mongoose");

//Import reaction Schema
const reactionSchema = require("./Reaction");

//Define new schema for Thoughts
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
            hour12: true,
          };
          return date.toLocaleDateString(undefined, options);
        }
      },
    },
    username: {
      type: String,
      required: true,
    },
    // Reactions are an array of nested documents created with the reaction schema
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

//Virtual for counting Reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return `${this.reactions.length}`;
});

//Initialize Thought Model
const Thought = model("thought", thoughtSchema);

//Export Thought model
module.exports = Thought;
