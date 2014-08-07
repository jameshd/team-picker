'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Match = mongoose.model('Match'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Match already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Match
 */
exports.create = function(req, res) {
	var match = new Match(req.body);
	match.user = req.user;

	match.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(match);
		}
	});
};

/**
 * Show the current Match
 */
exports.read = function(req, res) {
	res.jsonp(req.match);
};

/**
 * Update a Match
 */
exports.update = function(req, res) {
	var match = req.match;

	match = _.extend(match, req.body);

	match.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(match);
		}
	});
};

/**
 * Delete an Match
 */
exports.delete = function(req, res) {
	var match = req.match;

	match.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(match);
		}
	});
};

/**
 * List of Matches
 */
exports.list = function(req, res) {
	Match.find().sort('-created').populate('user', 'displayName').exec(function(err, matches) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(matches);
		}
	});
};

/**
 * Match middleware
 */
exports.matchByID = function(req, res, next, id) {
	Match.findById(id).populate('user', 'displayName').exec(function(err, match) {
		if (err) return next(err);
		if (!match) return next(new Error('Failed to load Match ' + id));
		req.match = match;
		next();
	});
};

/**
 * Match authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.match.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};