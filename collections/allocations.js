Allocations = new Meteor.Collection('allocations');

Meteor.methods({
	saveAllocations: function(allocationAttributes) {
		var user = Meteor.user();
		if (!user)
			throw new Meteor.Error(401, "You need to login!");

		var existingAllocationRecord = Allocations.findOne({ userId: Meteor.user()._id });

		if (existingAllocationRecord) {
			if (allocationAttributes.type === constants.VACATION_DAY) {
				Allocations.update(existingAllocationRecord._id, { $set: { vacation: allocationAttributes.days } });
			} else if (allocationAttributes.type === constants.PERSONAL_DAY) {
				Allocations.update(existingAllocationRecord._id, { $set: { personal_days: allocationAttributes.days } });
			} else if (allocationAttributes.type === constants.SICK_DAY) {
				Allocations.update(existingAllocationRecord._id, { $set: { sick_days: allocationAttributes.days } });
			}
		} else {
			if (allocationAttributes.type === constants.VACATION_DAY) {
				Allocations.insert({userId: user._id, vacation: allocationAttributes.days});
			} else if (allocationAttributes.type === constants.PERSONAL_DAY) {
				Allocations.insert({userId: user._id, personal_days: allocationAttributes.days});
			} else if (allocationAttributes.type === constants.SICK_DAY) {
				Allocations.insert({userId: user._id, sick_days: allocationAttributes.days});
			}
		}
	}
});