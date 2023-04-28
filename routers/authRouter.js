const router = require('express').Router();
const authController = require('../controller/authController')

router.post('/signup',authController.signUpController)
router.post('/login',authController.loginController)

module.exports = router;