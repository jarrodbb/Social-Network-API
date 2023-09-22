const { User, Thought } = require("../models");

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

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.json(404).json({
          message: "Thought created, but no user with that ID",
        });
      }

      res.json("Created Thought");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      console.log(thought);
      if (thought.username === req.body.username) {
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
        return res.json({ messgae: "username the same" });
        // return res.json(thought);
      } else {
        const userWithOldThought = await User.findOneAndUpdate(
          {
            thoughts: req.params.thoughtId,
          },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
        // const thought = await Thought.create(req.body);

        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
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

        res.json("Created Thought");
      }

      if (!thought) {
        return res.status(404).json({ message: "No Thought with that ID :(" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
