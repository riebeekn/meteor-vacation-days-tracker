Template.forgotPassword.events({
	'submit #forgotPassword': function (e, t) {
		e.preventDefault();

		var email = t.find('#email').value.toLowerCase();

		// validate fields
    if (hasValidationErrors(email)) {
      return;
    }
    
		Accounts.forgotPassword({email: email}, function(err){
    	if (err) {
        displayEmailError(err.reason);
      }
      else {
        displaySuccessMessage("Email has been sent, please check your email.");
      }
    });
  }
});

var hasValidationErrors = function (email) {
  if (!AccountsValidationHelper.validateEmail(email)) {
    displayEmailError("Invalid email format.");
    return true;
  } else {
    removeEmailError();
    return false;
  }
}

var displayEmailError = function (errMess) {
  $('#email-error').addClass('error-text').text(errMess);
  $('#email-group').addClass('has-error');
}

var removeEmailError = function () {
  $('#email-error').removeClass('error-text').text('');
  $('#email-group').removeClass('has-error');
}

var displaySuccessMessage = function (successMess) {
  $('#email-error').addClass('success-text').text(successMess);
  $('#email-group').addClass('has-success');
}