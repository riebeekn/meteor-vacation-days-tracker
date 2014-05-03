Template.daysRemaining.helpers ({
	yearlyVacation: function() {
		return vacationAllocated();
	},
	yearlyPD: function() {
		return pdAllocated();
	},
	yearlySickDays: function() {
		return sdAllocated();
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
		save(t.find('#vacation').value, constants.VACATION_DAY);
	},
	'change #pd': function (e, t) {
		save(t.find('#pd').value, constants.PERSONAL_DAY);
	},
	'change #sd': function (e, t) {
		save(t.find('#sd').value, constants.SICK_DAY);
	}
});

/* helper methods */
var save = function(days, type) {
	var allocation = {
		days: days,
		type: type
	};

	Meteor.call('saveAllocations', allocation, function (error, result) {
		if (error) {
			console.log(error);
		}
	});
}

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