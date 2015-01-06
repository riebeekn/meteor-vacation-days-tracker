Meteor.publish('allocations', function() {
	return Allocations.find({userId: this.userId});
});
Meteor.publish('events', function() {
	var currentYear = new Date().getFullYear();
	var lastDayOfPrevYear = currentYear - 1 + '-12-31';
	var firstDayOfNextYear = currentYear + 1 + '-01-01';

	return Events.find({
		userId: this.userId, 
		start: {$gt: lastDayOfPrevYear, $lt: firstDayOfNextYear}
	});
});