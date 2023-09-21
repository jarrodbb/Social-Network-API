const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

Module.exports = {
  //Get all Users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();

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
      }).select("-__v");

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
};
