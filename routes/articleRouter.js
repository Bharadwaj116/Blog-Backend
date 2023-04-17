const express = require("express");

const router = express.Router();

const {
  createArticle,
  GetArticle,
  getArticles,
  UpdateArticle,
  DeleteArticle,
} = require("../controllers/articleController");

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/create").post(createArticle);

router.route("/").get(getArticles);

router.route("/:id").get(GetArticle).put(UpdateArticle).delete(DeleteArticle);

// router.route("/:id");

// router.route("/:id");

module.exports = router;
