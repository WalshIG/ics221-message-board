const passport = require('passport'); 
const express = require('express');
const api_router = express.Router();
const msgAPIController = require('../controllers/msg-api'); 
const userAPIController = require('../controllers/user-api'); 

//router.route('/msgs')
api_router.route('/msgs') 
.get(msgAPIController.getAllMessagesOrderedByLastPosted)
.post(msgAPIController.addNewMessage)
.delete(passport.authenticate('basic', { session: false }),msgAPIController.deleteAll);

//get single message update and delete
api_router.route('/msgs/:messageid') 
.delete(passport.authenticate('basic', { session: false }),msgAPIController.deleteSingleMessage)
.put(passport.authenticate('basic', { session: false }),msgAPIController.updateMessage);
    
api_router.post('/users', userAPIController.registerNewUser);
api_router.get('/users/login', 
passport.authenticate('basic', {session: false}),
userAPIController.loginUser);
    
module.exports = api_router;