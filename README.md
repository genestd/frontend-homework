# SETUP

Clone this repository
Run `npm install`
Create a .env file with the following entries:
 - [ ] PORT=8080
 - [ ]MONGO_USER=
 - [ ]MONGO_PASSWORD=
 - [ ]MONGO_HOST=
 - [ ]MONGO_PORT=
 - [ ]MONGO_DB=
 for best results, some seed data is needed.  (A client list, a work item list, and some starter invoices).  Note: You can view the app connected to my data source at https://dg-invoice.glitch.me/

Run `npm test` to start the server
The app will start on port 8080


## Constraints

The assignment said it should take a few hours.  I tried to limit myself to about 8 hours or 1 day of work.  I wasn't able to spend an entire day on this, but I think it was about 8 hours over the course of 3 days.

## Tools

I used React and Redux for the front end, and Foundation 6 framework to make it pretty and handle responsiveness, modals, etc.

I used express and mongoDB for the back end.

Axios is the package to connect the client and server


## Todos

Even after 8 hours there are still lots of features not implemented.  The most critical items from my perspective:
  * Prettifying the client.  This is always a slow task for me and I didn't have much time left over for it
  * Form validation.  I did just enough to keep it from erroring out, but there is room for improvement
  * Invoice Life Cycle.  I ran out of time connecting the Status life cycle to the server.  Ideally there would be a flow to handle past due items, and to update status when user interacted with the invoice.  
