const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;
const User = mongoose.model('User');
const Chant = mongoose.model('Chant');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}


/*module.exports.getChant= (req, res, next) =>{
    Chant.find((err, chants) => {
        if (!err) { res.send(chants); }
        else { console.log('Error in Retriving Chant :' + JSON.stringify(err, undefined, 2)); }
    });
};
module.exports.postChant= (req, res, next) =>{
    var chant = new Chant();
    chant.name=req.body.name;
    chant.contenu= req.body.contenu;
    chant.dateCreation=req.body.dateCreation;
    chant.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in chant Save :' + JSON.stringify(err, undefined, 2)); }
    });
};


module.exports.putChant= (req, res, next) =>{
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
    };
  
  //Delete Chant
 
  
module.exports.deleteChant= (req, res, next) =>{
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No record with given id : ${req.params.id}`);
    
        Chant.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Chant Delete :' + JSON.stringify(err, undefined, 2)); }
        });
    };
*/