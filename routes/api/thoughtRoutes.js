//Require express
const router = require("express").Router();

//Import from controllers
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addAReaction,
  removeAReaction,
} = require("../../controllers/thoughtControllers");

//Define routes
router.route("/").get(getThoughts).post(createThought);

//Define routes
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//Define routes
router.route("/:thoughtId/reactions").post(addAReaction);

//Define routes
router.route("/:thoughtId/reactions/:reactionId").delete(removeAReaction);

//Export
module.exports = router;
