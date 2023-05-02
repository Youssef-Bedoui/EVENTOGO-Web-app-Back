const router = require('express').Router();
const userController = require("../controllers/user.controller");


router.get("/users", userController.getAllUsers);
router.get("/getUser/:email", userController.selectUser);
router.delete("/delete/:id", userController.deleteUser);
router.patch("/update/:id", userController.updateUser);
router.put("/updateVerifCode", userController.updateVerificationCode);

router.post("/signup", userController.signUp);
router.post('/signin',userController.signIn )

module.exports = router;
