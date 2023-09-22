const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addAReaction,
  removeAReaction,
} = require("../../controllers/thoughtControllers");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(addAReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeAReaction);

module.exports = router;
