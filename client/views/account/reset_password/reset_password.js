Template.resetPassword.events({
	'submit #resetPassword': function (e, t) {
		e.preventDefault();

		var password = t.find('#password').value;

		// validate fields
    if (hasValidationErrors(password)) {
      return;
    }

		Accounts.resetPassword(AccountsSessionHelper.getResetToken(), password, function (err) {
      if (validatePasswordReset(err)) {
        $('#account').modal('hide');
        Router.go('home');
      }
		});
	}
});

var validatePasswordReset = function (err) {
  if (err) {
    displayPasswordError(err.reason);
    return false;
  } else {
    removePasswordError();
    return true;
  }
}

var hasValidationErrors = function (password) {
  if (!AccountsValidationHelper.validatePassword(password)) {
    displayPasswordError("Must be between 6 and 30 characters.");
    return true; 
  } else {
    removePasswordError();
    return false;
  }
}

var displayPasswordError = function (errMess) {
  $('#password-error').addClass('error-text').text(errMess);
  $('#password-group').addClass('has-error');
}

var removePasswordError = function () {
  $('#password-error').removeClass('error-text').text('');
  $('#password-group').removeClass('has-error');
}