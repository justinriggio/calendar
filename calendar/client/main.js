import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

CalEvents = new Meteor.Collection('calevents');
Files = new Meteor.Collection('files');

var calendar = null;


Template.calendar.onRendered( () => {

	var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  calendar = $('#calendar').fullCalendar({
  	header: {
      left: 'basicDay, basicWeek, month',
      center: 'title',
      right: 'today prev,next'
    },
  	editable: true,
    dayClick: function(date) {
    	if (Meteor.user()){
		    swal.setDefaults({
		        confirmButtonText: 'Next &rarr;',
		        showCancelButton: true,
		        animation: false,
		        progressSteps: ['1', '2', '3', '4'],
		    })
		    swal.queue([{
		        title: 'New Event',
		        text: 'Event Name:',
		        input: 'text',
		        preConfirm: function(inputValue) {
		            return new Promise(function(resolve, reject) {
		                if (!inputValue) {
		                    reject('Enter a Name')
		                } else {
		                    inputName = inputValue;
		                    resolve()
		                }
		            })
		        }
		    }, {
		        title: 'New Event',
		        text: 'Event Description:',
		        input: 'text',
		        preConfirm: function(inputValue) {
		            return new Promise(function(resolve, reject) {
		                if (!inputValue) {
		                    reject('Enter a Description')
		                } else {
		                    inputDescription = inputValue;
		                    resolve()
		                }
		            })
		        }
		    }, {
		        title: 'New Event',
		        text: 'Event Time:',
		        input: 'select',
		        inputOptions: {
		        		'04:00:00': '04:00 AM',
		        		'05:00:00': '05:00 AM',
		            '06:00:00': '06:00 AM',
		            '07:00:00': '07:00 AM',
		            '08:00:00': '08:00 AM',
		            '09:00:00': '09:00 AM',
		            '10:00:00': '10:00 AM',
		            '11:00:00': '11:00 AM',
		            '12:00:00': '12:00 PM',
		            '13:00:00': '01:00 PM',
		            '14:00:00': '02:00 PM',
		            '15:00:00': '03:00 PM',
		            '16:00:00': '04:00 PM',
		            '17:00:00': '05:00 PM',
		            '18:00:00': '06:00 PM',
		            '19:00:00': '07:00 PM',
		            '20:00:00': '08:00 PM',
		            '21:00:00': '09:00 PM',
		            '22:00:00': '10:00 PM'
		        },
		        inputPlaceholder: 'Select Time',
		        preConfirm: function(inputValue) {
		            return new Promise(function(resolve, reject) {
		                if (!inputValue) {
		                    reject('Enter a Time')
		                } else {
		                    inputTime = inputValue;
		                    resolve()
		                }
		            })
		        }
		    }, {
		        title: 'Select image',
					  input: 'file',
					  inputAttributes: {
					    accept: 'image/*'
					  },
		        preConfirm: function(inputValue) {
		            return new Promise(function(resolve, reject) {
		                if (!inputValue) {
		                    reject('Enter a Time')
		                } else {
		                    inputDataURL = inputValue;
		                    resolve()
		                }
		            })
		        }
		    }]).then(function(inputValue) {
		        // $('#calendar').fullCalendar('renderEvent', {
		        //     title: inputName,
		        //     description: inputDescription,
		        //     start: date.format() + 'T' + inputTime,
		        //     allDay: false,
		        // }, 'stick');
		        CalEvents.insert({title:inputName,
		        	description: inputDescription,
			    		start: date.format() + 'T' + inputTime,
			    		end: null,
			    		color: Meteor.user().profile.color,
			    		dataUrl: inputDataURL,
			    		createdAt: new Date()
			    	});
		        swal.resetDefaults()
		        var reader = new FileReader
		        swal({
		            title: 'Event Created',
		            html: "Name: " + inputName + "<br>Description: " + inputDescription + "<br>Time: " + inputTime + "<img src='" + reader.readAsDataURL(inputDataURL) +"'>",
		            confirmButtonText: 'Done',
		            showCancelButton: false
		        })
		    }, function() {
		        swal.resetDefaults()
		    })
		   }
		},
    eventClick: function(event) {
    	if (Meteor.user()){
    	console.log(event);
		    swal({
		        title: event.title,
		        html: "Description: " + event.description + "<br>Time: " + moment(event.start).format("hh:mm A"),
		        showCancelButton: true,
		        confirmButtonColor: '#3085d6',
		        confirmButtonText: 'Edit'
		    }).then(function() {
		        swal.setDefaults({
		            confirmButtonText: 'Next &rarr;',
		            showCancelButton: true,
		            animation: false,
		            progressSteps: ['1', '2', '3'],
		        })
		        swal.queue([{
		            title: 'New Event',
		            text: 'Event Name:',
		            input: 'text',
		            preConfirm: function(inputValue) {
		                return new Promise(function(resolve, reject) {
		                    if (!inputValue) {
		                        reject('Enter a Name')
		                    } else {
		                        inputName = inputValue;
		                        event.title = inputName;
		                        resolve()
		                    }
		                })
		            }
		        }, {
		            title: 'New Event',
		            text: 'Event Description:',
		            input: 'text',
		            preConfirm: function(inputValue) {
		                return new Promise(function(resolve, reject) {
		                    if (!inputValue) {
		                        reject('Enter a Description')
		                    } else {
		                        inputDescription = inputValue;
		                        event.description = inputDescription;
		                        resolve()
		                    }
		                })
		            }
		        }, {
		            title: 'New Event',
		            text: 'Event Time:',
		            input: 'select',
		            inputOptions: {
		                '06:00:00': '06:00 AM',
		                '07:00:00': '07:00 AM',
		                '08:00:00': '08:00 AM',
		                '09:00:00': '09:00 AM',
		                '10:00:00': '10:00 AM',
		                '11:00:00': '11:00 AM',
		                '12:00:00': '12:00 PM',
		                '13:00:00': '01:00 PM',
		                '14:00:00': '02:00 PM',
		                '15:00:00': '03:00 PM',
		                '16:00:00': '04:00 PM',
		                '17:00:00': '05:00 PM',
		                '18:00:00': '06:00 PM',
		                '19:00:00': '07:00 PM',
		                '20:00:00': '08:00 PM',
		                '21:00:00': '09:00 PM',
		                '22:00:00': '10:00 PM'
		            },
		            inputPlaceholder: 'Select Time',
		            preConfirm: function(inputValue) {
		                return new Promise(function(resolve, reject) {
		                    if (!inputValue) {
		                        reject('Enter a Time')
		                    } else {
		                        inputTime = inputValue;
		                        event.start = moment(event.start).format("YYYY-MM-DD") + 'T' + inputTime;
		                        resolve()
		                    }
		                })
		            }
		        }, {
		        title: 'Select image',
					  input: 'file',
					  inputAttributes: {
					    accept: 'image/*'
					  },
		        preConfirm: function(inputValue) {
		            return new Promise(function(resolve, reject) {
		                if (!inputValue) {
		                    reject('Enter a Time')
		                } else {
		                    inputDataURL = inputValue;
		                    resolve()
		                }
		            })
		        }
		    }]).then(function(inputValue) {
		            $('#calendarDiv').fullCalendar('updateEvent', event);
		            swal.resetDefaults()
		            swal({
		                title: 'Event Created',
		                html: "Name: " + inputName + "<br>Description: " + inputDescription + "<br>Time: " + inputTime,
		                confirmButtonText: 'Done',
		                showCancelButton: false
		            })
		        }, function() {
		            swal.resetDefaults()
		        })
		    })
			}
		},
    events: function(start, end, timezone, callback) {
      var events = [];
      reqEvents = CalEvents.find({},{reactive:false});
      reqEvents.forEach(function(evt){
        event = {id: evt._id,
        		title: evt.title,
        		description: evt.description,
        		start: evt.start,
        		end: evt.end,
        		color: evt.color,
        		dataUrl: evt.dataUrl
        };
        events.push(event);
        console.log("event " + event.id);
      })
      callback(events);
    }
  }).data().fullCalendar;

	window.c = calendar;

  Deps.autorun(function(){
    allCalEventsCursor = CalEvents.find().fetch();
    console.log("Autorun -> ", allCalEventsCursor.length)
    if(calendar){
    	calendar.refetchEvents();
    	console.log("calendar refetchEvents");
    }
        
  });


});
