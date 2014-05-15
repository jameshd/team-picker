'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Signup = mongoose.model('Signup'),
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
				message = 'Signup already exists';
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
 * Create a Signup
 */
exports.create = function(req, res) {
	var signup = new Signup(req.body);
	signup.user = req.user;

	signup.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(signup);
		}
	});
};

/**
 * Show the current Signup
 */
exports.read = function(req, res) {
	res.jsonp(req.signup);
};

/**
 * Update a Signup
 */
exports.update = function(req, res) {
	var signup = req.signup;

	signup = _.extend(signup, req.body);

	signup.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(signup);
		}
	});
};

/**
 * Delete an Signup
 */
exports.delete = function(req, res) {
	var signup = req.signup;

	signup.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(signup);
		}
	});
};

/**
 * List of Signups
 */
exports.list = function(req, res) {
	Signup.find().sort('-created').populate('user', 'displayName').exec(function(err, signups) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(signups);
		}
	});
};

/**
 * Signup middleware
 */
exports.signupByID = function(req, res, next, id) {
	Signup.findById(id).populate('user', 'displayName').exec(function(err, signup) {
		if (err) return next(err);
		if (!signup) return next(new Error('Failed to load Signup ' + id));
		req.signup = signup;
		next();
	});
};

/**
 * Signup authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.signup.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};