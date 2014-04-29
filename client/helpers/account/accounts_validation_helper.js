AccountsValidationHelper = new function() {

	var emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
	this.validateEmail = function (email) {
		return emailFormat.test(email);
	},
	this.validatePassword = function(password) {
		return password.length >= 6 && password.length <= 30;
	}
}
    	