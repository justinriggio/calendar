import { Meteor } from 'meteor/meteor';

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
});
