Template.calendarLayout.rendered = function () {
	if (!Meteor.user) {
		$('#account').modal('show');
	}
};

Template.calendarLayout.events({
	'click button#close': function (e) {
		e.preventDefault();

		$('#account').modal('hide');
		AccountsSessionHelper.setDisplayToSignInForm();
	}
});

Template.calendarLayout.helpers({
	displaySignUpForm: function () {
		return AccountsSessionHelper.displaySignUpForm();
	},
	displayForgotPasswordForm: function () {
		return AccountsSessionHelper.displayForgotPasswordForm();
	},
	displayResetPasswordForm: function () {
		return AccountsSessionHelper.displayResetPasswordForm();
	},
	displaySignInForm: function () {
		return AccountsSessionHelper.displaySignInForm();
	},
	displayDefault: function () {
		return AccountsSessionHelper.displayDefaultForm();
	},
	title: function () {
		return AccountsSessionHelper.getTitle();
	}
});