Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { 
		return [
			Meteor.subscribe('allocations'), 
		  Meteor.subscribe('events')
		]; 
	} 
});

Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'calendarLayout'
	});
});

Router.onBeforeAction('loading');