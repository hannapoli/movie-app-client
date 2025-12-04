const express = require('express');
const router = express.Router();
const { mostrarLogin } = require('../controllers/auth.controller');
const { login } = require('../controllers/auth.controller');

router.get('/', mostrarLogin);
router.post('/login', login);

module.exports = router;
//router.post('')