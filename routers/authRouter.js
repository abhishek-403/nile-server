const router = require('express').Router();
const authController = require('../controller/authController')

router.post('/signup', authController.signUpController)
router.post('/login', authController.loginController)
router.post('/logout', authController.logOutController)
router.post('/refres', authController.refreshAccessTokenController)

module.exports = router;