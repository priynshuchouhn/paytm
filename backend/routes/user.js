const express = require('express');
const { signIn, signUp, updateProfile, getUsers } = require('../controller/user');
const authMiddleware = require('../middleware/middleware');
const router = express.Router();

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);
router.put('/update-profile',authMiddleware, updateProfile);
router.get('/bulk', getUsers);


module.exports  = router