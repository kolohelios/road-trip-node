'use strict';

var Trip = require('../../models/trip');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'POST',
    path: '/trips/{tripId}/stops',
    config: {
      description: 'add a stop to a trip',
      validate: {
        params: {
          tripId: Joi.string().length(24).required()
        },
        payload: {
          name: Joi.string().required(),
          lat: Joi.number().required(),
          lng: Joi.number().required()
        }
      },
      handler: function(request, reply){
        Trip.findById(request.params.tripId, function(err, trip){
          trip.stops.push(request.payload);
          trip.save(function(){
            reply(request.payload);
          });
        });
      }

}
  });
  return next();
};

exports.register.attributes = {
  name: 'trips.addStop'
};
