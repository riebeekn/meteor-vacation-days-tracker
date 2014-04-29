Template.signInButton.events({
	'click button#signIn': function (e) {
		e.preventDefault();
		
		AccountsSessionHelper.setDisplayToSignInForm();
		Router.go('account');
	}
});