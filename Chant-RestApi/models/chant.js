const mongoose = require('mongoose');

var Chant = mongoose.model('Chant', {
    name: { type: String },
    contenu: { type: String },
    dateCreation: { type: Date }
    
   
});

module.exports = { Chant };