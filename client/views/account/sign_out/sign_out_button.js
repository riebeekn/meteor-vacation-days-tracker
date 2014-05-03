Template.signOutButton.events({
	'click button#signOut': function (e) {
		e.preventDefault();
		
		Meteor.logout();
		AccountsSessionHelper.setDisplayToSignInForm();
	}
});