const router = require('express').Router();
const authController = require('../controller/authController')

router.post('/signup',authController.signUpController)

module.exports = router;