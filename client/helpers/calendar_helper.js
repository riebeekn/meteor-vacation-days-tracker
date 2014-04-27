constants = {
	'VACATION_DAY': 'Vacation Day',
	'PERSONAL_DAY': 'Personal Day',
	'SICK_DAY': 'Sick Day',
	'STAT': 'Stat Day'
}

formatDate = function(date) {
	try {
		return date.getFullYear() + '-' + 
			("0" + (date.getMonth() + 1)).slice(-2) + '-' + 
			("0" + date.getDate()).slice(-2);
	} catch (exception){
		// do nothing
	}
}