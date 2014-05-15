'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Signup Schema
 */
var SignupSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Signup name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Signup', SignupSchema);