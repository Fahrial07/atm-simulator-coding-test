const express = require('express');
const Controller = require('../controllers/transaction.controller');
const router = express.Router();

router.post('/transfer', (req, res) => {
    Controller.transfer(req, res)
});

router.post('/deposite', (req, res) => {
    Controller.deposite(req, res)
})

router.post('/widdraw', (req, res) => {
    Controller.widdraw(req, res)
})

module.exports = router;