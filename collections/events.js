Events = new Meteor.Collection('events');

Meteor.methods({
	saveEvent: function(eventAttributes) {
		var user = Meteor.user();
		if (!user)
			throw new Meteor.Error(401, "You need to login!");

		existingEvent = Events.findOne({userId: user._id, start: eventAttributes.date});
		if (existingEvent) {
			if (eventAttributes.type === 'Cancel') {
				Events.remove(existingEvent._id);
			}	else {
				Events.update(existingEvent._id, {$set: {title: 'type', type: eventAttributes.type}});
			}
		} else {
			if (eventAttributes.type !== 'Cancel') {
				Events.insert({userId: user._id, title: eventAttributes.type, 
					type: eventAttributes.type, start: eventAttributes.date, end: eventAttributes.date});
			}
		} 
	}
});