// routes.js

const express = require('express');
const router = express.Router();

// Definice rout a obslužných funkcí
router.get('/timetable', (req, res) => {
    res.render('timetable');
});

router.get('/about', (req, res) => {
  res.send('About page');
});

router.get('/contact', (req, res) => {
  res.send('Contact page');
});

// Exportování routeru
module.exports = router;
