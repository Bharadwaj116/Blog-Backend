const express = require("express");

const router = express.Router();

const {chooseTopics} = require("../controllers/topicController")

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").post(chooseTopics);

module.exports = router;