# calendar

install meteor

    curl https://install.meteor.com/ | sh

set up a Test Facebook app and get the App ID and App Secret, under App Domains enter:
    
    localhost

under Add platform select Website and enter:

    http://localhost:3000/

git clone project:

    git clone git@github.com:justinriggio/calendar.git && cd calendar/calendar

in server/main.js on line 14 and 15 enter App ID and App Secret

then do 

    meteor npm install

start meteor app by running meteor like so:

    meteor

At this ponit you should see the app running at http://localhost:3000/

before you can add events you will need to login with Facebook, the login is in the top right. Once logged in you can add events and click to edit events. You can also upload images. Every user gets a custom random color for the calendar.

Enjoy :)




