const express = require("express");
const router = express.Router();
const interestedController = require("../controllers/interested.controller");

router.get("/getNumber/:id", interestedController.getNumber);
router.post("/addFirstNum/:id", interestedController.addFirstNum);
router.put("/modifNum/:id", interestedController.modifNum);

module.exports = router;
