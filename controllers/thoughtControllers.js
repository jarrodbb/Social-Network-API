//Controllers for Thoughts

// Require User and Thought from models folder
const { User, Thought } = require("../models");

// Export controllers
module.exports = {
  //Get all Thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Get a single Thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "no thought with that ID, try again" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Create a Thought
  async createThought(req, res) {
    try {
      // First find user to make sure they exist
      const findUser = await User.findOne({
        _id: req.body.userId,
        username: req.body.username,
      });
      if (!findUser) {
        return res.status(404).json({
          message: "No user matching. Verified Username and ID required",
        });
      }
      //If User exists, create a thought
      const thought = await Thought.create(req.body);
      //Add Thought to User
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but no user with that ID",
        });
      } else {
        // Respond with new thought and message
        return res.json({ thought, message: "Created Thought" });
      }
    } catch (err) {
      // Catch error
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Update Thought
  async updateThought(req, res) {
    try {
      // Find thought that is to be updated
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      console.log(thought);
      // Check if the user making the update is the same as the user that created the thought
      if (thought.username === req.body.username) {
        //If the user is the same. Find the thought by ID and set the body as the updated Thought
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
        if (!thought) {
          return res
            .status(404)
            .json({ message: "No Thought with that ID :(" });
        }
        // Send the updated Thought with a message
        return res.json({ thought, messgae: "Thought updated" });
      } else {
        //If the User updating the Thought is not the same First pull the thought from the original user
        const userWithOldThought = await User.findOneAndUpdate(
          {
            thoughts: req.params.thoughtId,
          },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
        // Update thought
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
        // Add Thought to User
        const user = await User.findByIdAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: req.params.thoughtId } },
          { new: true }
        );
        if (!user) {
          return res.json(404).json({
            message: "Thought created, but no user with that ID",
          });
        }
        // Respond with Thought and message
        res.json({ thought, message: "Created Thought" });
      }

      if (!thought) {
        return res.status(404).json({ message: "No Thought with that ID :(" });
      }
    } catch (err) {
      // Catch error
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Remove thought by ID
  async deleteThought(req, res) {
    try {
      // Find Thought by ID and remove
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No Thought with this id!" });
      }
      // Pull Thought from User
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought deleted but no user with this id!" });
      }
      //Respond with message
      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      // Catch error
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add A Reaction to a Thought
  async addAReaction(req, res) {
    try {
      //Check user exists
      const findUser = await User.findOne({
        username: req.body.username,
      });
      //If no User, return
      if (!findUser) {
        return res.status(404).json({
          message: "No user matching. Verified Username and ID required",
        });
      }
      // Add Reaction to Thought
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      //If no Thought, return
      if (!thought) {
        return res.status(404).json({ message: "No Thought with this id! :(" });
      }
      // Respond with Thought
      res.json(thought);
    } catch (err) {
      // Catch error
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Remove a Reaction
  async removeAReaction(req, res) {
    try {
      //Find Thought by ID and remove Reaction
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      //If no Thought, return
      if (!thought) {
        return res.status(404).json({ message: "No Thought with this id!" });
      }
      //Respond with Thought and message
      res.json({ thought, message: "Deleted Reaction!" });
    } catch (err) {
      // Catch error
      console.log(err);
      res.status(500).json(err);
    }
  },
};
