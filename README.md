# Job Application Tracker
## Tracking system for job applications

The main goal of this system was to create an application that will allow registering every candidate's job application, keeping track on applications and analyzing the efficiency of job search channels. 

Technologies used in project:
1. HTML5, CSS3, Typescript
2. React
3. Redux
4. NodeJs
5. Auth0
6. MongoDB
7. Cloudinary

### The relationship UML is shown below:

![UML Relationship Diagram](https://res.cloudinary.com/ds609wv4s/image/upload/v1664343607/JAT-readme/_job-application-tracker.drawio_y73zu4.png)


### The login and authorization flow:
When user logins to the system, the request is sent to identity provider(for example Google) and it verifies his credentials against it. 
If user is verified, Identity provider sends to Auth0 user identity, and Auth0 generates access token and refresh token based on user identity and sends them to the browser with user data.

Then the access token is attached to every request to the server, it goes through middleware that verifies this token againist public key that's stored on the server.
![Login and Authorization flow](https://res.cloudinary.com/ds609wv4s/image/upload/v1664346738/JAT-readme/_job-application-tracker-Login_Flow_and_authorization.drawio_tkl7wv.png)



