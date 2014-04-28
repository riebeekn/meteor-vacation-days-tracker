Template.daysRemaining.helpers ({
	yearlyVacation: function() {
		return vacationAllocated();//23
	},
	yearlyPD: function() {
		return pdAllocated();//4
	},
	yearlySickDays: function() {
		return sdAllocated();//7
	},
	vacationRemaining: function() {
		return vacationAllocated() - Events.find({type: constants.VACATION_DAY}).count();
	},
	pdRemaining: function() {
		return pdAllocated() - Events.find({type: constants.PERSONAL_DAY}).count();
	},
	sdRemaining: function() {
		return sdAllocated() - Events.find({type: constants.SICK_DAY}).count();
	}
});

Template.daysRemaining.events({
	'change #vacation': function (e, t) {

		var user = Meteor.user()
		var existingAllocationRecord = Allocations.findOne({ userId: user._id});
		var vacationAllocated = t.find('#vacation').value;

		if (existingAllocationRecord) {
			Allocations.update(existingAllocationRecord._id, { $set: { vacation: vacationAllocated } });
		} else {
			Allocations.insert({userId: user._id, vacation: vacationAllocated});
		}
	},
	'change #pd': function (e, t) {

		var user = Meteor.user()
		var existingAllocationRecord = Allocations.findOne({ userId: user._id});
		var pdAllocated = t.find('#pd').value;

		if (existingAllocationRecord) {
			Allocations.update(existingAllocationRecord._id, { $set: { personal_days: pdAllocated } });
		} else {
			Allocations.insert({userId: user._id, personal_days: pdAllocated});
		}
	},
	'change #sd': function (e, t) {

		var user = Meteor.user()
		var existingAllocationRecord = Allocations.findOne({ userId: user._id});
		var sdAllocated = t.find('#sd').value;

		if (existingAllocationRecord) {
			Allocations.update(existingAllocationRecord._id, { $set: { sick_days: sdAllocated } });
		} else {
			Allocations.insert({userId: user._id, sick_days: sdAllocated});
		}
	}
});

var vacationAllocated = function() {
	var existingAllocationRecord = Allocations.findOne({ userId: Meteor.user()._id });
	if (existingAllocationRecord && existingAllocationRecord.vacation) {
		return existingAllocationRecord.vacation;
	} else {
		return 0;
	}
}

var pdAllocated = function() {
	var existingAllocationRecord = Allocations.findOne({ userId: Meteor.user()._id });
	if (existingAllocationRecord && existingAllocationRecord.personal_days) {
		return existingAllocationRecord.personal_days;
	} else {
		return 0;
	}
}

var sdAllocated = function() {
	var existingAllocationRecord = Allocations.findOne({ userId: Meteor.user()._id });
	if (existingAllocationRecord && existingAllocationRecord.sick_days) {
		return existingAllocationRecord.sick_days;
	} else {
		return 0;
	}
}