const express = require('express');
const router = express.Router();

router.get('/ti', (req, res) => {

      res.render('timetable');
    
  });
  
module.exports = router;