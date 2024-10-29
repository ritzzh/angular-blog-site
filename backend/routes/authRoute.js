const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login',authController.login);
router.post('/signup',authController.signup);

router.post('/getdetails', authController.getDetails);
router.post('/updatedetails',authController.updateDetails);

module.exports = router;
