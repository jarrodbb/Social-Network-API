const router = require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  //   updateUser,
  //   deleteUser,
  //   addAFriend,
  //   deleteAFriend,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId").get(getSingleUser);
// .put(updateUser).delete(deleteUser);

// router
//   .route("/:userId/friends/:friendId")
//   .post(addAFriend)
//   .delete(deleteAFriend);

module.exports = router;
