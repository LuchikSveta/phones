const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const tariffRouter = require('./routes/tariff');
const serviceRouter = require('./routes/service');
// const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json({limit: '10mb', extended: true}));

const uri = "mongodb+srv://admin:admin@cluster0.5zwgq.mongodb.net/data-base?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}, function(err){
  if(err) return console.log(err);
  app.listen(process.env.PORT || 8081, function(){
    console.log("Сервер ожидает подключения...");
  });
});
mongoose.set('useFindAndModify', false);
//
// const Services = require('./models/Services');
// const service = new Services({name: 'Услуга номер 10'});
// const service2 = new Services({name: 'Услуга номер 11'});
// service.save();
// service2.save();

app.use('/tariff', tariffRouter);
app.use('/service', serviceRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
