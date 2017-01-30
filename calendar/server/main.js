import { Meteor } from 'meteor/meteor';

CalEvents = new Meteor.Collection('calevents');
Files = new Meteor.Collection('files');


Meteor.startup(() => {
  // first, remove configuration entry in case service is already configured
	Accounts.loginServiceConfiguration.remove({
	  service: "facebook"
	});
	Accounts.loginServiceConfiguration.insert({
	  service: "facebook",
	  appId: "659743730877343",
	  secret: "4fdc7cfd6068285bf479ab8fc68a274a"
	});
	// Add random color to user object
	Accounts.onCreateUser(function(options, user) {
		console.log("onCreateUser add color to user object on first login");
		// Use provided profile in options, or create an empty object
   	user.profile = options.profile || {};
	  user.profile.color = '#'+Math.floor(Math.random()*16777215).toString(16);
	  
	  return user;
	});
});
