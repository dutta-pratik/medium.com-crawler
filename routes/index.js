const express = require("express");

const router = express.Router();

const homeController = require("../controllers/home_controller");

router.get("/", homeController.homePage);

router.post("/search", homeController.search);

router.get("/crawldata", homeController.crawlData);

module.exports = router;