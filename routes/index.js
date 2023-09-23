//Require express
const router = require("express").Router();
//Import routes
const apiRoutes = require("./api");

//Define routes
router.use("/api", apiRoutes);

//Send message if route doesn't exist
router.use((req, res) => res.send("Wrong route!"));

//Export
module.exports = router;
