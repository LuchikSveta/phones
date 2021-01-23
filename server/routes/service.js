const express = require('express');
const router = express.Router();
const Services = require('../models/Services');

router.get("/get", function(req, res){
  Services.find().then(services => {
    return res.json({services: services});
  }, error=> {
    res.json({message: error.name});
  });
});

module.exports = router;