'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Main = mongoose.model('Main'),
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
				message = 'Main already exists';
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
 * Create a Main
 */
exports.create = function(req, res) {
	var main = new Main(req.body);
	main.user = req.user;

	main.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(main);
		}
	});
};

/**
 * Show the current Main
 */
exports.read = function(req, res) {
	res.jsonp(req.main);
};

/**
 * Update a Main
 */
exports.update = function(req, res) {
	var main = req.main;

	main = _.extend(main, req.body);

	main.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(main);
		}
	});
};

/**
 * Delete an Main
 */
exports.delete = function(req, res) {
	var main = req.main;

	main.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(main);
		}
	});
};

/**
 * List of Mains
 */
exports.list = function(req, res) {
	Main.find().sort('-created').populate('user', 'displayName').exec(function(err, mains) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(mains);
		}
	});
};

/**
 * Main middleware
 */
exports.mainByID = function(req, res, next, id) {
	Main.findById(id).populate('user', 'displayName').exec(function(err, main) {
		if (err) return next(err);
		if (!main) return next(new Error('Failed to load Main ' + id));
		req.main = main;
		next();
	});
};

/**
 * Main authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.main.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};