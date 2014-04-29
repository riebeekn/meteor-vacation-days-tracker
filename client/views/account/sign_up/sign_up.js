Template.signUp.events({
	'submit #signUp': function (e, t) {
		e.preventDefault();
		var email = t.find('#email').value.toLowerCase();
    var password = t.find('#password').value;

    // validate fields
    if (hasValidationErrors(email, password)) {
      return;
    }
    
    // attempt to create the account
    Accounts.createUser({email: email, password : password}, function (err) {
    	if (validateUserCreation(err)) {
        $('#account').modal('hide');
        Router.go('home');
      }
    });
	}
});

var validateUserCreation = function (err) {
  if (err) {
    if (err.error === 403) { 
      displayEmailError(err.reason);
      displayPasswordError();
    } else {
      displayEmailError("Account creation failed, please try again.")
      displayPasswordError();
    }

    return false;
  } else {
    removeEmailError();
    removePasswordError();

    return true;
  }
}

var hasValidationErrors = function (email, password) {
  var hasValidationError = false;
  if (!AccountsValidationHelper.validateEmail(email)) {
    displayEmailError("Invalid email format.");
    hasValidationError = true;
  } else {
    removeEmailError();
  }

  if (!AccountsValidationHelper.validatePassword(password)) {
    displayPasswordError("Must be between 6 and 30 characters.");
    hasValidationError = true;
  } else {
    removePasswordError();
  }

  return hasValidationError;
}

var displayEmailError = function (errMess) {
  $('#email-error').addClass('error-text').text(errMess);
  $('#email-group').addClass('has-error');
}

var removeEmailError = function () {
  $('#email-error').removeClass('error-text').text('');
  $('#email-group').removeClass('has-error');
}

var displayPasswordError = function (errMess) {
  $('#password-error').addClass('error-text').text(errMess);
  $('#password-group').addClass('has-error');
}

var removePasswordError = function () {
  $('#password-error').removeClass('error-text').text('');
  $('#password-group').removeClass('has-error');
}