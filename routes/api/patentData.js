const express = require('express');

const router = express.Router();
const patentCtrl = require('../../controllers/api/pageData');

router.post('/patentId', patentCtrl.create)


module.exports = router