//Controllers for User

// Require User and Thought from models folder
const { User, Thought } = require("../models");

//Export Controllers
module.exports = {
  //Get all Users
  async getAllUsers(req, res) {
    try {
      //Find all Users
      const users = await User.find()
        //Populate Friends and Thoughts
        .populate({ path: "friends", select: "-__v" })
        .populate({ path: "thoughts", select: "-__v" });
      //Respond with Users
      res.json(users);
    } catch (err) {
      // Catch errors
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Get a Single User by ID
  async getSingleUser(req, res) {
    try {
      //Find one user by ID
      const user = await User.findOne({
        _id: req.params.userId,
      })
        //Populate Friends and Thoughts
        .populate({ path: "friends", select: "-__v" })
        .populate({ path: "thoughts", select: "-__v" });

      //If no user, return
      if (!user) {
        return res
          .status(404)
          .json({ message: "no user with that ID, try again" });
      }
      //Respond with User
      res.json(user);
    } catch (err) {
      //Catch error
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Create User
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      //Respond with User
      res.json({ user, message: "User Created" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Update User by ID
  async updateUser(req, res) {
    try {
      //Find one User by ID and Update
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        //Populate Friends and Thoughts
        .populate({ path: "friends", select: "-__v" })
        .populate({ path: "thoughts", select: "-__v" });
      //If no User, return
      if (!user) {
        return res.status(400).json({ message: "No User with that ID, Sorry" });
      }
      //Respond with User
      res.json({ user, message: "User Updated" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete User by ID
  async deleteUser(req, res) {
    try {
      //Find one User by ID and remove
      const user = await User.findOneAndRemove({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: "No User with that ID, Sorry" });
      }
      //Remove all Thoughts by User
      const thought = await Thought.deleteMany(
        { username: user.username },
        { new: true }
      );
      //Respond with message
      res.json({
        message: "User successfully deleted",
      });
    } catch (err) {
      //Catch error
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Add a new friend to a user's friend list
  async addAFriend(req, res) {
    try {
      //Find User by ID and add friend
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        //Populate Friends and Thoughts
        .populate({ path: "friends", select: "-__v" })
        .populate({ path: "thoughts", select: "-__v" });

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user with that ID. Sorry :(" });
      }

      res.json({ user, message: "You're popular. Friend added" });
    } catch (err) {
      //Catch error
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Remove a friend from a user's friend list
  async deleteAFriend(req, res) {
    try {
      //Find User by ID and remove Friend by ID
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        //Populate Friends and Thoughts
        .populate({ path: "friends", select: "-__v" })
        .populate({ path: "thoughts", select: "-__v" });
      //If no User, Return
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user with that ID. Sorry :(" });
      }
      //Respond with User and message
      res.json({ user, message: "That's sad. Friend deleted" });
    } catch (err) {
      //Catch error
      console.log(err);
      res.status(500).json(err);
    }
  },
};
