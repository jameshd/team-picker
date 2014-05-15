'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Login = mongoose.model('Login'),
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
				message = 'Login already exists';
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
 * Create a Login
 */
exports.create = function(req, res) {
	var login = new Login(req.body);
	login.user = req.user;

	login.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(login);
		}
	});
};

/**
 * Show the current Login
 */
exports.read = function(req, res) {
	res.jsonp(req.login);
};

/**
 * Update a Login
 */
exports.update = function(req, res) {
	var login = req.login;

	login = _.extend(login, req.body);

	login.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(login);
		}
	});
};

/**
 * Delete an Login
 */
exports.delete = function(req, res) {
	var login = req.login;

	login.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(login);
		}
	});
};

/**
 * List of Logins
 */
exports.list = function(req, res) {
	Login.find().sort('-created').populate('user', 'displayName').exec(function(err, logins) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(logins);
		}
	});
};

/**
 * Login middleware
 */
exports.loginByID = function(req, res, next, id) {
	Login.findById(id).populate('user', 'displayName').exec(function(err, login) {
		if (err) return next(err);
		if (!login) return next(new Error('Failed to load Login ' + id));
		req.login = login;
		next();
	});
};

/**
 * Login authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.login.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};