const express = require('express');
const { signIn, signUp, updateProfile } = require('../controller/user');
const router = express.Router();

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);
router.post('/update-profile', updateProfile);


module.exports  = router