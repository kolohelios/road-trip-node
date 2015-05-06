'use strict';

var Secrets;

try{
  Secrets = require('./secrets');
}catch(ex){}

var env = process.env.NODE_ENV || 'development';

var common = {
  FIREBASE_SECRET: Secrets ? Secrets.FIREBASE_SECRET : process.env.FIREBASE_SECRET,
  FIREBASE_EXPIRE: 24
};

var environments = {
  development: {
    PORT: 8000,
    MONGO_URL: 'mongodb://localhost/roadtrip-dev'
  },
  test: {
    PORT: 0,
    MONGO_URL: 'mongodb://localhost/roadtrip-test'
  },
  production: {
    PORT: 8000,
    MONGO_URL: 'mongodb://heroku_app36605639:in360sf6f44a81r2pdrr3kvg9l@ds031832.mongolab.com:31832/heroku_app36605639'
  }
};

var environment = environments[env];

Object.keys(common).forEach(function(key){
  environment[key] = common[key];
});

console.log('Environment: ', environment);
exports.environment = environment;
