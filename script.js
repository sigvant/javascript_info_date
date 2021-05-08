// Create a date
// importance: 5
// Create a Date object for the date: Feb 20, 2012, 3:12am. The time zone is local.

// Show it using alert.

let date = new Date(2012, 1, 20, 3, 12);
console.log(date);

// The new Date constructor uses the local time zone. So the only important thing to remember is that months start from zero.
// So February has number 1.
// Here’s an example with numbers as date components:

// new Date(year, month, date, hour, minute, second, millisecond)
let d1 = new Date(2012, 1, 20, 3, 12);
alert(d1);

//we could also create a date from a string, like this:
// new Date(dateasstring)
let d2 = new Date("February 20, 2012 03:12:00");
alert(d2);

// #######################################################################################

// Write a function getWeekDay(date) to show the weekday in short format: 
// ‘MO’, ‘TU’, ‘WE’, ‘TH’, ‘FR’, ‘SA’, ‘SU’.

// For instance:

let date = new Date(2012, 0, 3);  // 3 Jan 2012
alert( getWeekDay(date) );        // should output "TU"

// date.getDay() returns a number, we can use it to verify for positions in an array of names

function getLocalDay(date) {
	let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

	return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Jan 2014
alert( getWeekDay(date) ); //FR

// #######################################################################################

// European weekday
// importance: 5
// European countries have days of week starting with Monday (number 1), 
// hen Tuesday (number 2) and till Sunday (number 7). 
// Write a function getLocalDay(date) that returns the “European” day of week for date.

function getLocalEuropeanDay(date) {
	
	let day = date.getDay();

	if (day == 0) { // because 0 is 7 for europeans, daywise - simple fix
		day = 7;
	}

	return day;
}

let date = new Date(2014, 0, 3); // 3 Jan 2014
alert( getWeekDay(date) ); //FR

// #######################################################################################

// Which day of month was many days ago?
// importance: 4
// Create a function getDateAgo(date, days) to return the day 
// f month days ago from the date.

// For instance, if today is 20th, then getDateAgo(new Date(), 1) 
// should be 19th and getDateAgo(new Date(), 2) should be 18th.

// Should work reliably for days=365 or more:

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)

// P.S. The function should not modify the given date.

// the idea is simple: to subtract given number of days from date:

function getDateAgo(date, days) {
	date.setDate(date.getDate() - days);
	return date.getDate();
}

// ... but the function should not change date. that's an important thing, because the outer
// code which gives us the date does not expect it to change.
// To implement it let's clone the date, like this:

function getDateAgo(date, days) {
	let dateCopy = new Date(date);

	dateCopy.setDate(date.getDate() - days);
	// data will be set to the actual date in the date object minus the number of days
	return dateCopy.getDate();
	// gets the data that was calculated to dateCopy
}

let date = new Date(2017, 0, 5);

alert( getDateAgo(date, 10) ); 
alert( getDateAgo(date, 20) ); 
alert( getDateAgo(date, 3650) );

// #######################################################################################


// Last day of month?
// importance: 5
// Write a function getLastDayOfMonth(year, month) that returns the last day of month. 
// Sometimes it is 30th, 31st or even 28/29th for Feb.

// Parameters:

// year – four-digits year, for instance 2012.
// month – month, from 0 to 11.
// For instance, getLastDayOfMonth(2012, 1) = 29 (leap year, Feb).

// let's create a date using the next month, but pass zero as the day:

function getLastDayOfMonth(yaer, month) {
	let date = new Date(year, month + 1, 0);
	return date.getDate();
}

alert( getLastDayOfMonth(2012, 0)); // 31
alert( getLastDayofMonth(2012, 1)); // 29;

// normally, dates start from 1, but technically we can pass any number, the date will 
// autoadjust itself. So when we pass 0, then it means 'one day before 1sd day of the month'
// in other words, 'the last day of the previous month'

// #######################################################################################

// How many seconds have passed today?
// importance: 5
// Write a function getSecondsToday() that returns the number of seconds from 
// the beginning of today.

// For instance, if now were 10:00 am, and there was no daylight savings shift, then:

// getSecondsToday() == 36000 // (3600 * 10)
// The function should work in any day. That is, it should not have a hard-coded 
// alue of “today”.

function getSecondsToday() {
	let now = new Date();

	// create an object using the current day/month/year
	let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	// extracting the INTERESTING parts of the new Date object into our today object

	let diff = now - today; // ms difference
	return Math.round(diff / 1000); // make seconds out of the milliseconds

}

alert( getSecondsToday() );

// ## an alternative solution would be to get hours/minutes/seconds and convert them to seconds:

function getSecondsToday(){
	let d = new Date();
	return d.getHours() * 36000 + d.getMinutes() * 60 + d.getSeconds();
}

alert( getSecondsToday() );

// ####################################################################################

// How many seconds till tomorrow?
// importance: 5
// Create a function getSecondsToTomorrow() that returns the number of seconds till tomorrow.

// For instance, if now is 23:00, then:

getSecondsToTomorrow() == 3600
// P.S. The function should work at any day, the “today” is not hardcoded.

// to get the number of milliseconds till tomorrow, we can from 'tomorrow 00:00:00' subtract
// the current date

function getSecondsToTomorrow() {
	let now = new Date();

	// tomorrow date
	let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
	// this +1 means the day of tomorrow

	let diff = tomorrow - now; // difference always in ms
	return Math.round(diff / 1000); // convert to seconds
}

// ## there is also an alternative solution

function getSecondsToTomorrow() {
	let now = new Date();
	let hour = now.getHours();
	let minutes = now.getMintes();
	let seconds = now.getSeconds();
	let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
	let totalSecondsInADay = 86400;

	return totalSecondsInADay  - totalSecondsToday;
}

// I like second solution, but first solution is more elegant.

// ####################################################################################

// Format the relative date
// importance: 4
// Write a function formatDate(date) that should format date as follows:

// If since date passed less than 1 second, then "right now".
// Otherwise, if since date passed less than 1 minute, then "n sec. ago".
// Otherwise, if less than an hour, then "m min. ago".
// Otherwise, the full date in the format "DD.MM.YY HH:mm". 
// That is: "day.month.year hours:minutes", all in 2-digit format, e.g. 31.12.16 10:00.
// For instance:

alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.16 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );

// to get the time from 'date' till now - let's subtract the dates:

function formatDate(date) {
	let diff = new Date() - date; // difference in milliseconds

	if (diff < 1000) { // less than 1 second
		return 'right now';
	}

	let sec = Math.floor(diff / 1000); // convert diff to seconds

	if (sec < 60) {
		return sec + ' sec. ago';
	}

	let min = Math.floor(diff / 60000); // convert diff to minutes

	if (min < 60) {
		return min + ' min. ago';
	}

	// format the date
	// add leading zeroes to single-digit day/month/hours/minutes
	let d = date;
	d = [
		'0' + d.getDate(),
		'0' + (d.getMonth() + 1),
		''  + d.getFullYear(),
		'0' + d.getHours(),
		'0' + d.getMinutes()
	].map(component => component.slice(-2)); // take last 2 digits of every component
	// if month is 4, this makes it 04 and 04 is taken. if month is 10, ths makes it 010 and 10
	// is taken

	// join the components into date
	return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
	// this ccreates the format DD.MM.YY HH:mm
}

alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.2016 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );

// ####################################################################################


// Alternative SOlution

function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // formatting
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  if (diffSec < 1) {
    return 'right now';
  } else if (diffMin < 1) {
    return `${diffSec} sec. ago`
  } else if (diffHour < 1) {
    return `${diffMin} min. ago`
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}

// ####################################################################################
