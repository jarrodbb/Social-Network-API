//Require express
const router = require("express").Router();
//Import user routes
const userRoutes = require("./userRoutes");
//Import thought routes
const thoughtRoutes = require("./thoughtRoutes");

//User routes use /users
router.use("/users", userRoutes);
//Thought routes use /thoughts
router.use("/thoughts", thoughtRoutes);

//Export router
module.exports = router;
