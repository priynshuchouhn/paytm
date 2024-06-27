const express = require('express');
const { balance, transfer } = require('../controller/account');
const authMiddleware = require('../middleware/middleware');
const router = express.Router();

router.get('/balance', authMiddleware,balance);
router.post('/transfer',authMiddleware, transfer);



module.exports = router