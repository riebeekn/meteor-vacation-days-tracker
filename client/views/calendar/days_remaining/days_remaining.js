Template.daysRemaining.helpers ({
	yearlyVacation: function() {
		return 23;
	},
	yearlyPD: function() {
		return 4;
	},
	yearlySickDays: function() {
		return 7;
	},
	vacationRemaining: function() {
		return 23 - Events.find({type: constants.VACATION_DAY}).count();
	},
	pdRemaining: function() {
		return 4 - Events.find({type: constants.PERSONAL_DAY}).count();
	},
	sdRemaining: function() {
		return 7 - Events.find({type: constants.SICK_DAY}).count();
	}
});