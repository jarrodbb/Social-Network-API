const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  //   addAReaction,
  //   deleteAReaction,
} = require("../../controllers/thoughtControllers");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// router
//   .route("/:thoughtId/reactions")
//   .post(addAReaction)
//   .delete(deleteAReaction);

module.exports = router;
