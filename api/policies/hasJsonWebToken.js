'use strict';
/* jshint unused:false */
var jwt = require('waterlock').jwt;
var config = require('waterlock').config;
var _utils = require('waterlock')._utils;
/**
 * hasJsonWebToken
 *
 * @module      :: Policy
 * @description :: Assumes that your request has an jwt;
 *
 * @docs        :: http://waterlock.ninja/documentation
 */
module.exports = function(req, res, next) {
  
  var token = _utils.allParams(req).access_token;

  //sails.debug(token);
  console.log('thanh ==asa= 12 ' + token);

  if(token){
    try{
        console.log('000000000000');
        console.log(config.jsonWebTokens.secret);
      // decode the token
      var _token = jwt.decode(token, config.jsonWebTokens.secret);
      
      console.log('1111111');

      // set the time of the request
      var _reqTime = Date.now();

      console.log('22222');

      // If token is expired
      if(_token.exp <= _reqTime){
        return res.forbidden('Your token is expired.');        
      }
      console.log('22222');
      // If token is early
      if(_reqTime <= _token.nbf){
        return res.forbidden('This token is early.');
      }
      console.log('22222');
      // If audience doesn't match
      if(config.jsonWebTokens.audience !== _token.aud){
        return res.forbidden('This token cannot be accepted for this domain.');
      }

      // deserialize the token iss
      var _iss = _token.iss.split('|');

      User.findOne(_iss[0]).exec(function(err, user){
        Jwt.findOne({token: token}, function(err, j){
          if(j.revoked){
            return res.forbidden('This token has been revoked');
          }

          req.session.authenticated = true;
          req.session.user = user;

          var use = {jsonWebToken: j.id, remoteAddress: req.connection.remoteAddress};
          Use.create(use);

          return next(); 
        });
      });
    } catch(err){
      return res.forbidden(err);
    }
  }else{
    return res.forbidden('Access token not present.');
  }
};
