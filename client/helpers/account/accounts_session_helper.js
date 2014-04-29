AccountsSessionHelper = new function() {
	
	var accountFormSessionKey = "accountFormToDisplay";
	var passwordResetTokenSessionKey = "passwordResetToken";
	var signUp = "signUp";
	var forgotPassword = "forgotPassword";
	var resetPassword = "resetPassword";
	var signIn = "signIn";

	this.displaySignUpForm = function () {
		return Session.equals(accountFormSessionKey, signUp);
	},
	this.displayForgotPasswordForm = function () {
		return Session.equals(accountFormSessionKey, forgotPassword);
	},
	this.displayResetPasswordForm = function () {
		return Session.equals(accountFormSessionKey, resetPassword);
	},
	this.displaySignInForm = function () {
		return Session.equals(accountFormSessionKey, signIn);
	},
	this.displayDefaultForm = function () {
		return !Session.equals(accountFormSessionKey, signUp) &&
					 !Session.equals(accountFormSessionKey, forgotPassword) &&
					 !Session.equals(accountFormSessionKey, resetPassword) &&
					 !Session.equals(accountFormSessionKey, signIn);
	},
	this.setDisplayToSignUpForm = function () {
		Session.set(accountFormSessionKey, signUp);
	},
	this.setDisplayToSignInForm = function () {
		Session.set(accountFormSessionKey, signIn);
	},
	this.setDisplayToForgotPasswordForm = function () {
		Session.set(accountFormSessionKey, forgotPassword);
	},
	this.setDisplayToResetPasswordForm = function () {
		Session.set(accountFormSessionKey, resetPassword);
	},
	this.setResetToken = function (token) {
		Session.set(passwordResetTokenSessionKey, token);
	},
	this.getResetToken = function () {
		return Session.get(passwordResetTokenSessionKey);
	}
	this.getTitle = function () {
		if (Session.equals(accountFormSessionKey, forgotPassword)) {
			return 'Forgot Password';
		} else if (Session.equals(accountFormSessionKey, signUp)) {
			return 'Create Account';
		} else if (Session.equals(accountFormSessionKey, resetPassword)){
			return 'Reset Password';
		} else {
			return 'Sign In';
		}
	}
}

