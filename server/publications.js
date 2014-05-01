Meteor.publish('allocations', function() {
	return Allocations.find({userId: this.userId});
});
Meteor.publish('events', function() {
	return Events.find({userId: this.userId});
});