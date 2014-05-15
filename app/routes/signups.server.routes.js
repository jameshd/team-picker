'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var signups = require('../../app/controllers/signups');

	// Signups Routes
	app.route('/signups')
		.get(signups.list)
		.post(users.requiresLogin, signups.create);
	
	app.route('/signups/:signupId')
		.get(signups.read)
		.put(users.requiresLogin, signups.hasAuthorization, signups.update)
	    .delete(users.requiresLogin, signups.hasAuthorization, signups.delete);

	// Finish by binding the Signup middleware
	app.param('signupId', signups.signupByID);
};