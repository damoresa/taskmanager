## Task manager

Task management application that features an _Angular_ frontend and 
a _NodeJS_ backend with a _MongoDB_ database.  
The application is designed to be deployed on [Heroku](www.heroku.com) 
on a free or hobby dyno and is thought for individual use - as in one 
user per application instance as of 28/11/2017 - so most of it's 
provided tooling is either used or recommended.
  
As of 2/12/2017 the application supports a very simple _JWT_ authentication 
pattern, with expiry yet to be implemented. Also, tasks / projects are still 
global so the application is designed for a single user. In the future I may 
consider adding a user to project relationship, but that's out of the scope now.
  
The purpose of the application is to actually help myself manage 
my own time in order to be able to analyze certain scenarios.
  
  
### Project structure

The project contains the following folders:
* __Constants__: as it may be obvious, contains contants such as the 
database connection string.
* __Controllers__: _Express_ controllers.
* __Models__: _Mongoose_ models.
* __NG2__: Contains the _Angular_ application sources and _Webpack_ 
configuration files. The application will be compiled into the _public_ 
folder from which _Express_ will publish it as static content.
  
### Frontend

The frontend is built using _Angular_ and _Webpack_. It features _AOT_ 
compilation and _lazy loading_ in order to guarantee maximum performance.  
_Bootstrap_ is used as theming framework over _Angular Material_ 
because of personal preference.  
  
User authentication via _OAuth_ is still pending implementation.
  
  
### Backend

The backend is built using _NodeJS_ and _MongoDB_. As of today, the 
following data can be stored and handled at the application:
* __Projects__: allows you to define projects you'll later attach 
tasks to.
* __Tasks__: allows you to define your tasks, setting estimated duration.
On the future, it should also be possible to set deadlines and even 
launch email notifications with _Sendgrid_.
  
The database connection string is injected by the process environment 
using the variable name _DATABASE_URI_.
  
  
### Future features

On the near/mid future, you can expect the following features:
* Dockerfile to support Docker image deployments.
* Better _JWT_ management - expiry and whatnot.
* User roles to allow multi-user instances where "_project leaders_" can 
assign other users to their projects in order to grant or revoke vision 
of the tasks. Aditionally, this could also bring user assignment to tasks.

### Running the project

The following scripts are provided by default:
* _npm run build_: build the _Angular_ application, leaving it on the 
folder which will be published as static content by _Express_.
* _npm run devStart_: start _nodemon_ process in order to enable 
_hot reloading_ while implementing new features.
* _npm start_: start the backend application on production mode.