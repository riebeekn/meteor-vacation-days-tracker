Template.calendar.rendered = function() {
	// keep track of the latest date that has been clicked
	dateSelected = '';

	// calendar set-up
	$('#calendar').fullCalendar({
		header: {
			right: 'prev, next'
		},
		viewDisplay: function(view) { 
			restrictCalendarToCurrentYear(view)
		},
		events: function(start, end, callback) {
			events = formatEventsRetrievedFromServer();
			stats = getStatHolidays();
			$.merge(events, stats);
			$.each(events, function(index, value) {
				setBackgroundColorOfEvent(value);
			});
			callback(events);
		},
		dayClick: function(date, allDay, jsEvent, view) {
			//console.log(date.getDay());, potentially set something here if sat/sun/stat to prevent context menu
			dateSelected = formatDate(date);
		},
		eventClick: function(calEvent, jsEvent, view) {
			dateSelected = formatDate(calEvent.start);
		},
		eventBorderColor: '#aaa'
	});

	setUpContextMenu();

	Meteor.autorun(function(){
		$('#calendar').fullCalendar('refetchEvents');
	});
}

setUpContextMenu = function() {
		$('#calendar').contextmenu({
    target: '#context-menu',
    before: function(e, element, target) {
    	e.preventDefault();
    	tagType = e.target.tagName;
    	className = e.target.className;
    	dayClass = className.indexOf('fc-day') >= 0;
    	saturday = className.indexOf('fc-sat') >= 0;
    	if (tagType !== 'DIV' && className !== 'fc-event-title' && !dayClass) {
    		this.closemenu();
    		return false;
    	}

    	return true;
    },
    onItem: function(e, item) {
    	handleContextMenuSelection(item);
    }
 	});
}

handleContextMenuSelection = function(selection) {
	type = $(selection).text();
	// potentially change title so that more phone friendly
	// if (type === 'Sick Day')
	// {
	// 	title = 'Sick'; or S
	// }
	// else if (type === 'Vacation Day') {
	// 	title = 'Off'; or V
	// }
	// else if (type === 'Personal Day') {
	// 	title = 'PD'; or P
	// }
 	
	existingEvent = Events.findOne({start: dateSelected});
	if (existingEvent) {
		if (type === 'Cancel') {
			Events.remove(existingEvent._id);
			clearBackgroundColor(existingEvent);
		}	else {
			Events.update(existingEvent._id, {$set: {title: 'type', type: type}});
		}
	} else {
		if (type !== 'Cancel') {
			Events.insert({title: type, type: type, start: dateSelected, end: dateSelected});
		}
	} 
}

formatEventsRetrievedFromServer = function() {
	eventsToDisplay = [];
	Events.find().forEach(function(event) {
		eventsToDisplay.push({
			id: event._id,
			title: event.title,
			type: event.type,
			start: event.start,
			end: event.end
		})
	})

	return eventsToDisplay;
}

setBackgroundColorOfEvent = function(event) {
	if (event.type === constants.VACATION_DAY || 
		  event.type === constants.PERSONAL_DAY) {
		$('.fc-day[data-date="' + event.start + '"]').addClass('holiday');
	} else if (event.type == constants.STAT) {
		$('.fc-day[data-date="' + formatDate(event.start) + '"]').addClass('stat');	
	} else if (event.type === constants.SICK_DAY) {
		$('.fc-day[data-date="' + event.start + '"]').addClass('sick-day');
	}
}

clearBackgroundColor = function(event) {
	$('.fc-day[data-date="' + event.start + '"]').removeClass('holiday').
	                                              removeClass('sick-day');
}

restrictCalendarToCurrentYear = function(view) {
	currentYear = new Date().getFullYear();
	startDate = new Date(currentYear + '/01/01');
	endDate = new Date(currentYear + '/12/31');
	if (view.end > endDate) {
		$("#calendar .fc-button-next").addClass('fc-state-disabled');
	} else {
		$("#calendar .fc-button-next").removeClass('fc-state-disabled');	
	}
	if (view.start <= startDate) {
		$("#calendar .fc-button-prev").addClass('fc-state-disabled');
	} else {
		$("#calendar .fc-button-prev").removeClass('fc-state-disabled');
	}
}