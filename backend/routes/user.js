const express = require('express');
const { signIn, signUp, updateProfile } = require('../controller/user');
const authMiddleware = require('../middleware/middleware');
const router = express.Router();

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);
router.post('/update-profile',authMiddleware, updateProfile);


module.exports  = router