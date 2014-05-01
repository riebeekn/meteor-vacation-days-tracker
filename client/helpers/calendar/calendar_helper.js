formatDate = function(date) {
	try {
		return date.getFullYear() + '-' + 
			("0" + (date.getMonth() + 1)).slice(-2) + '-' + 
			("0" + date.getDate()).slice(-2);
	} catch (exception){
		// do nothing
	}
}