Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('landing', {
		path: '/',
		template: 'landingPage'
	});

	this.route('home', {
		path: '/home',
		template: 'home'
	});

	this.route('calendar', {
		path: '/calendar',
		template: 'calendarLayout'
	})
});

var requireLogin = function(pause) {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			// this.render(this.loadingTemplate); 
		} else {
			this.render('landingPage');
		}
		pause();
	}
}

// This enforces login for all pages except the below ones.
Router.onBeforeAction(requireLogin, { 
	except: ['account', 'resetPassword', 'landing']
});