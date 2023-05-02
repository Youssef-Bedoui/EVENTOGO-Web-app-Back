const router = require('express').Router();
const userController = require("../controllers/favorite.controller");


router.get("/getAll/:id", userController.selectAll);
router.delete("/deleteFavorite/:id_event", userController.deleteFavorite);
router.post("/addfavorite", userController.addFavorite);


module.exports = router;
