const router = require("express").Router();
const eventController = require("../controllers/event.controller");

router.get("/selectAll", eventController.selectAll);
router.get("/selectAllById/:id", eventController.selectAllById);
router.get("/selectAllByCountry/:id", eventController.selectAllByCountry);
router.get("/selectOne/:id", eventController.selectOne);
router.post("/add", eventController.addEvent);
router.put("/modif/:id", eventController.modifEvent);
router.delete("/delete/:id", eventController.deleteEvent);

module.exports = router;
