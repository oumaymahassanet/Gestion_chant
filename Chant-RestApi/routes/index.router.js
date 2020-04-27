const express = require('express');
const router = express.Router();
var { Chant } = require('../models/chant');

var ObjectId = require('mongoose').Types.ObjectId;


const passport = require('passport');


const ctrlUser = require('../controllers/user.controller');
const ctrlChant = require('../controllers/chant.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/userChant',jwtHelper.verifyJwtToken, ctrlChant.getChant);
router.post('/userChant',jwtHelper.verifyJwtToken,ctrlChant.postChant);
router.put('/userChant/:id',jwtHelper.verifyJwtToken,ctrlChant.putChant);
router.delete('/userChant/:id',jwtHelper.verifyJwtToken,ctrlChant.deleteChant);
router.get('/userChant/:id', jwtHelper.verifyJwtToken,ctrlChant.getOneChant);

module.exports = router;



