const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  //Get all Users
  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate(
        { path: "thoughts", select: "-__v" },
        { path: "friends", select: "-__v" }
      );

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Get a Single User
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      }).populate(
        { path: "thoughts", select: "-__v" },
        { path: "friends", select: "-__v" }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "no user with that ID, try again" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Create User
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Update User by ID
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(400).json({ message: "No User with that ID, Sorry" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete User by ID
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: "No User with that ID, Sorry" });
      }

      const thought = await Thought.findOneAndRemove(
        { username: user.username },
        { new: true }
      );

      if (!thought) {
        return res.status(400).json({
          message: "No thought could be found for this username",
        });
      }

      res.json({
        message: "User successfully deleted",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Add a new friend to a user's friend list
  async addAFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user with that ID. Sorry :(" });
      }

      req.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Remove a friend from a user's friend list
  async deleteAFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user with that ID. Sorry :(" });
      }

      req.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
