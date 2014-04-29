Template.signIn.events({
	'click #signUp': function (e) {
		e.preventDefault();
    AccountsSessionHelper.setDisplayToSignUpForm();
	},
	'click #forgotPassword': function (e) {
		e.preventDefault();
    AccountsSessionHelper.setDisplayToForgotPasswordForm();
	},
	'submit #signIn': function (e, t) {
		e.preventDefault();

		var email = t.find('#email').value.toLowerCase();
    var password = t.find('#password').value;

    // validate fields
    if (hasValidationErrors(email)) {
      return;
    }

    // attempt to sign in
    Meteor.loginWithPassword(email, password, function(err){
      if (validateSignIn(err)) {
        $('#account').modal('hide');
      }
    })
	}
});

var validateSignIn = function (err) {
  if (err) {
    displayError(err.reason);
    return false;
  } else {
    removeError();
    return true;
  }
}

var hasValidationErrors = function (email) {
  if (!AccountsValidationHelper.validateEmail(email)) {
    displayError("Invalid email format.");
    return true;
  } else {
    removeError();
    return false;
  }
}

var displayError = function (errMess) {
  $('#email-error').addClass('error-text').text(errMess);
  $('#email-group').addClass('has-error');
  $('#password-group').addClass('has-error');
}

var removeError = function () {
  $('#email-error').removeClass('error-text').text('');
  $('#email-group').removeClass('has-error');
  $('#password-group').removeClass('has-error');
}