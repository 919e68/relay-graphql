'use strict';

var config = require('../config/config');
var request = require('request');
var zipline = {};
module.exports = zipline;


var requestPromise = function(options){
    return new Promise(function(resolve,reject){
        request(options, function(err, res, body){
            //console.log('wtq debug', options, body);
            if(err){
                reject(err);
            } else {
               //console.log(body);
                resolve(res, body);
            }
        });
    });
}

zipline.getAuthToken = function(email, pin) {
    var options = {
        url: 'https://mobile.paymentcard.com/MPayAutoActivate3/AuthService/AuthTypeBasic/GetAuthToken',
        auth: {
            user: config.ziplineUser,
            password: config.ziplinePassword,
        },
        method: "POST",
        json: true,
        body: {
            Email: email,
            MerchantID: config.ziplineMerchantID,
            PIN: pin,
        }
    };
    request(options, function (err, res, body) {
      if (err) {
        console.dir(err)
        return
      }
      console.dir(body)
    })

    return requestPromise(options).then(function(res, body) {
        //console.info(res);
        //logger.info(res);
        //console.info(body);
        //logger.info(body);
    }).catch(function(e){
        //console.log(e);
    });
}

console.log("wtq")

zipline.getAuthToken("mpaytest@nationalpaymentcard.com", 1111);