//Require express
const router = require('express').Router();

//Import from controllers
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addAFriend,
  deleteAFriend,
} = require('../../controllers/userController');

//Define routes
router.route('/').get(getAllUsers).post(createUser);

//Define routes
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

//Define routes
router
  .route('/:userId/friends/:friendId')
  .post(addAFriend)
  .delete(deleteAFriend);

//Export
module.exports = router;
