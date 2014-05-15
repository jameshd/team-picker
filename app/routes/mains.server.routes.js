'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var mains = require('../../app/controllers/mains');

	// Mains Routes
	app.route('/mains')
		.get(mains.list)
		.post(users.requiresLogin, mains.create);
	
	app.route('/mains/:mainId')
		.get(mains.read)
		.put(users.requiresLogin, mains.hasAuthorization, mains.update)
	    .delete(users.requiresLogin, mains.hasAuthorization, mains.delete);

	// Finish by binding the Main middleware
	app.param('mainId', mains.mainByID);
};