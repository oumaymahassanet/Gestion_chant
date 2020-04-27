
const mongoose = require('mongoose');

var ObjectId = require('mongoose').Types.ObjectId;

//var { Chant } = require('../models/chant');

const passport = require('passport');
const Chant = mongoose.model('Chant');

module.exports.getChant= ((req, res, next) =>{
  Chant.find((err, chants) => {
      if (!err) { res.send(chants); }
      else { console.log('Error in Retriving Chant :' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports.postChant=( (req, res) => {
  var chant = new Chant({
      name: req.body.name,
      contenu: req.body.contenu,
      dateCreation: req.body.dateCreation,
      
  });
  chant.save((err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports.putChant=( (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  var chant = {
    name: req.body.name,
    contenu: req.body.contenu,
    dateCreation: req.body.dateCreation,
    
  };
  Chant.findByIdAndUpdate(req.params.id, { $set: chant }, { new: true }, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Chant Update :' + JSON.stringify(err, undefined, 2)); }
  });
});
module.exports.deleteChant=( (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  Chant.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Chant Delete :' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports.getOneChant=( (req, res, next) =>{
  Chant.findOne({_id:ObjectId(req.params.id)}, function(err, chant){
      if(err){
          res.send(err);
      }
      res.json(chant);
  });
});






