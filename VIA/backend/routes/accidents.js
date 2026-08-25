const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { reportAccident, getAccidents } = require('../controllers/accidentController');


router.post('/report', upload.array('images',4), reportAccident);
router.get('/', getAccidents);


module.exports = router;