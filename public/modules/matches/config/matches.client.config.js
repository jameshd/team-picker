'use strict';

// Configuring the Articles module
angular.module('matches').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Matches', 'matches');
		Menus.addMenuItem('topbar', 'New Match', 'matches/create');
	}
]);