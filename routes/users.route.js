const express = require('express');
const Controller = require('../controllers/users.controller');
const router = express.Router();

router.post('/login', (req, res) => {
    Controller.login(req, res)
});

router.post('/register', (req, res) => {
    Controller.register(req, res)
});

// router.get('/getAll', (req, res) => {
//     Controller.getAll(req, res)
// })

// router.get('/getById/:id', (req, res) => {
//     Controller.getById(req, res)
// })

// router.delete('/delete/:id', (req, res) => {
//     Controller.delete(req, res)
// })

module.exports = router;
