const express = require('express');
const router = express.Router();
const Tariffs = require('../models/Tariffs');

router.get("/get", function(req, res){
  Tariffs.find().then(tariffs => {
    return res.json({tariffs: tariffs});
  }, error=> {
    res.json({message: error.name});
  });
});

router.post('/create', function(req, res){
  const {name, description, cost} = req.body;
  const newTariff= new Tariffs({
    name,
    description,
    cost,
  });
  newTariff.save()
    .then((tariff) => {
      return res.json({tariff: tariff});
    }, error=> {
      res.json({message: error.name});
    });
});

router.delete('/delete', function(req, res){
  const {id} = req.body;
  Tariffs.deleteOne({ _id: id }, function (err) {
    if (err) {
      res.json({message: err.name});
    }else {
      Tariffs.find().then(tariffs => {
        return res.json({tariffs: tariffs});
      }, error=> {
        res.json({message: error.name});
      });
    }
  });
});

router.post('/edit', function(req, res){
  const {id, name, description, cost} = req.body;
  Tariffs.findByIdAndUpdate(id, {name, description, cost}, function (err) {
    if (err) {
      res.json({message: err.name});
    }else {
      Tariffs.findById(id).then(tariff => {
        return res.json({tariff: tariff});
      }, error=> {
        res.json({message: error.name});
      });
    }
  }, error=> {
    res.json({message: error.name});
  });
});

router.post('/addServices', function(req, res){
  const {id, services} = req.body;
  Tariffs.findByIdAndUpdate(id, {activeServices: services}, function (err) {
    if (err) {
      res.json({message: err.name});
    }else {
      Tariffs.findById(id).then(tariff => {
        return res.json({tariff: tariff});
      }, error=> {
        res.json({message: error.name});
      });
    }
  }, error=> {
    res.json({message: error.name});
  });
});



module.exports = router;