const express = require('express');
const router = express.Router();
const Controller = require('../controllers/account.controller');

router.get('/account', (req, res) => {
    Controller.getAccount(req, res)
});

router.get('/all', (req, res) => {
    Controller.getAll(req, res);
})

router.delete('/delete/:id', (req, res) => {
    Controller.deleteAccount(req, res);
})



module.exports = router;