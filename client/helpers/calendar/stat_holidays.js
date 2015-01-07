
currentYear = new Date().getFullYear();

getStatHolidays = function() {
	statHolidays = [
		newYearsDay,
		familyDay,
		goodFriday,
		easterMonday,
		victoriaDay,
		canadaDay,
		augustLong,
		labourDay,
		thanksGiving,
		remembranceDay,
		christmas,
		boxingDay
	];

	return statHolidays;
}

setToMondayIfFallsOnWeekend = function(date) {
	day = date.getDay();
	if (day === 0) { // 0 represents a Sunday
		return date.getDate() + 1;
	} else if (day === 6) { // 6 represents a Saturday
		return date.getDate() + 2;
	}

	return date.getDate();
}

function getMondaysInMonth(date) { 
    var month = date.getMonth(),
        mondays = [];

    // Get the first Monday in the month
    while (date.getDay() !== 1) {
        date.setDate(date.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (date.getMonth() === month) {
        mondays.push(date.getDate());
        date.setDate(date.getDate() + 7);
    }

    return mondays;
}

/* 
	Create the day objects 
*/
// New Year's - Jan. 01
nyd = new Date(currentYear, 0, 1);
nyd.setDate(setToMondayIfFallsOnWeekend(nyd));
nyd = formatDate(nyd);
newYearsDay = {
	title: "New Year's Day",
	type: constants.STAT,
	start: nyd,
	end: nyd
}

// Family Day - 3rd Monday in February
fd = new Date(currentYear, 1, 1);
fd = new Date(currentYear, 1, getMondaysInMonth(fd)[2]);
fd = formatDate(fd);
familyDay = {
	title: "Family Day",
	type: constants.STAT,
	start: fd,
	end: fd
}

// Good Friday and Easter Monday - complicated calculation
easterSunday = Easter(currentYear).split('.');
easterMonth = parseInt(easterSunday[0]);
easterDay = parseInt(easterSunday[1]);
gf = new Date(currentYear, easterMonth - 1, easterDay - 2);
gf = formatDate(gf);
goodFriday = {
	title: "Good Friday",
	type: constants.STAT,
	start: gf,
	end: gf
}
em = new Date(currentYear, easterMonth - 1, easterDay + 1);
em = formatDate(em);
easterMonday = {
	title: "Easter Monday",
	type: constants.STAT,
	start: em,
	end: em
}

// Victoria Day - Last Monday before May 25th
vd = new Date(currentYear, 4, 24);
while (vd.getDay() !== 1) {
	vd.setDate(vd.getDate() - 1);
}
vd = formatDate(vd);
victoriaDay = {
	title: "Victoria Day",
	type: constants.STAT,
	start: vd,
	end: vd
}

// Canada Day - July 01
cd = new Date(currentYear, 6, 1);
cd.setDate(setToMondayIfFallsOnWeekend(cd));
cd = formatDate(cd);
canadaDay = {
	title: "Canada Day",
	type: constants.STAT,
	start: cd,
	end: cd
}

// August Long Weekend - First Monday in August
alw = new Date(currentYear, 7, 1);
while (alw.getDay() !== 1) {
	alw.setDate(alw.getDate() + 1);
}
alw = formatDate(alw);
augustLong = {
	title: "August Long Weekend",
	type: constants.STAT,
	start: alw,
	end: alw
}

// Labour Day - First Monday in September
ld = new Date(currentYear, 8, 1);
while (ld.getDay() !== 1) {
	ld.setDate(ld.getDate() + 1);
}
ld = formatDate(ld);
labourDay = {
	title: "Labour Day",
	type: constants.STAT,
	start: ld,
	end: ld
}

// Thanks Giving - 2nd Monday of October
tg = new Date(currentYear, 9, 1);
tg = new Date(currentYear, 9, getMondaysInMonth(tg)[1]);
tg = formatDate(tg);
thanksGiving = {
	title: "Thanks Giving Day",
	type: constants.STAT,
	start: tg,
	end: tg
}

// Remembrance Day - 11th Nov
rd = new Date(currentYear, 10, 11);
rd.setDate(setToMondayIfFallsOnWeekend(rd));
rd = formatDate(rd);
remembranceDay = {
	title: "Remembrance Day",
	type: constants.STAT,
	start: rd,
	end: rd
}

// Xmas - 25th Dec
cd = new Date(currentYear, 11, 25);
if (cd.getDay() == 0) {
	offset = 1;
} else if (cd.getDay() == 6) {
	offset = 2;
} else {
	offset = 0;
}
cd.setDate(cd.getDate() + offset);
cd = formatDate(cd);
christmas = {
	title: "Christmas Day",
	type: constants.STAT,
	start: cd,
	end: cd
}

// Boxing Day - 26th Dec
bd = new Date(currentYear, 11, 26);
if (bd.getDay() == 0) {
	offset = 1;
} else if (bd.getDay() == 6) {
	offset = 2;
} else {
	offset = 0;
}
bd.setDate(bd.getDate() + offset);
bd = formatDate(bd);
boxingDay = {
	title: "Boxing Day",
	type: constants.STAT,
	start: bd,
	end: bd
}

// from http://coderzone.org/library/Get-Easter-Date-for-any-year-in-Javascript_1059.htm
function Easter(Y) {
    var C = Math.floor(Y/100);
    var N = Y - 19*Math.floor(Y/19);
    var K = Math.floor((C - 17)/25);
    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7*Math.floor(J/7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40)/44);
    var D = L + 28 - 31*Math.floor(M/4);
 
    return M + '.' + D;
}