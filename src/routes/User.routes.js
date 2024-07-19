const express = require('express');
const authController = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { singupValidationSchema,loginValidationSchema } = require('../validation');

const router = express.Router();

router.post('/singup', validate(singupValidationSchema), authController.singup);
router.post('/login', validate(loginValidationSchema), authController.login);

module.exports = router;