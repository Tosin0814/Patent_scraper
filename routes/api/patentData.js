const express = require('express');

const router = express.Router();
const patentCtrl = require('../../controllers/api/patentData');


router.post('/patentData', patentCtrl.create)


module.exports = router