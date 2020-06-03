const express = require("express");

const router = express.Router();

const homeController = require("../controllers/home_controller");

router.get("/", homeController.homePage);

router.post("/search", homeController.search);

module.exports = router;