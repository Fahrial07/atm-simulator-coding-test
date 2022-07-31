const express = require('express');
const router = express.Router();

const usersRoute = require('./users.route');
const accountRoute = require('./account.route');
const transactionRouter = require('./transaction.route');

router.use('/users', usersRoute);
router.use('/bank', accountRoute);
router.use('/transaction', transactionRouter);

module.exports = router;