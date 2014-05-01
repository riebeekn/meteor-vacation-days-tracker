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
		var vacationAllocated = t.find('#vacation').value;
		var allocation = {
			days: vacationAllocated,
			type: constants.VACATION_DAY
		};

		Meteor.call('save', allocation, function(error, allocationId) {
			if (error) {
				throwError(error.reason);
			} 
		});
	},
	'change #pd': function (e, t) {
		var pdAllocated = t.find('#pd').value;
		var allocation = {
			days: pdAllocated,
			type: constants.PERSONAL_DAY
		};

		Meteor.call('save', allocation, function(error, allocationId) {
			if (error) {
				throwError(error.reason);
			} 
		});
	},
	'change #sd': function (e, t) {
		var sdAllocated = t.find('#sd').value;
		var allocation = {
			days: sdAllocated,
			type: constants.SICK_DAY
		};

		Meteor.call('save', allocation, function(error, allocationId) {
			if (error) {
				throwError(error.reason);
			} 
		});
	}
});

var vacationAllocated = function() {
	var existingAllocationRecord = getAllocations();
	if (existingAllocationRecord && existingAllocationRecord.vacation) {
		return existingAllocationRecord.vacation;
	} else {
		return 0;
	}
}

var pdAllocated = function() {
	var existingAllocationRecord = getAllocations();
	if (existingAllocationRecord && existingAllocationRecord.personal_days) {
		return existingAllocationRecord.personal_days;
	} else {
		return 0;
	}
}

var sdAllocated = function() {
	var existingAllocationRecord = getAllocations();
	if (existingAllocationRecord && existingAllocationRecord.sick_days) {
		return existingAllocationRecord.sick_days;
	} else {
		return 0;
	}
}

var getAllocations = function () {
	return Allocations.findOne({ userId: Meteor.user()._id });
}