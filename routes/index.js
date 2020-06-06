/********************Importing Package************************/
const express = require("express");

const router = express.Router();

/********************Importing Controller************************/
const homeController = require("../controllers/home_controller");

/********************Route FOR index************************/
router.get("/", homeController.homePage);

/********************Route FOR search************************/
router.post("/search", homeController.search);

/********************Route FOR crawlData************************/
router.post("/crawldata", homeController.crawlData);

module.exports = router;