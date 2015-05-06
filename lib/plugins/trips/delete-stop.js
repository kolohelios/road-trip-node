'use strict';

var Trip = require('../../models/trip');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'DELETE',
    path: '/trips/{tripId}/stops/{stopId}',
    config: {
      description: 'delete a stop from a trip',
      validate: {
        params: {
          tripId: Joi.string().length(24).required(),
          stopId: Joi.string().length(24).required()
        },
      },
      handler: function(request, reply){
        Trip.findById(request.params.tripId, function(err, trip){
          trip.stops.pull(request.params.stopId);
          trip.save();
          return reply(request.params.stopId);
        });
      }

}
  });
  return next();
};

exports.register.attributes = {
  name: 'trips.deleteStop'
};
