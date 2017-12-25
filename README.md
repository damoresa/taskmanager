## Task manager backend

[![Build Status](https://travis-ci.org/damoresa/taskmanager.svg?branch=master)](https://travis-ci.org/damoresa/taskmanager)
[![Coverage Status](https://coveralls.io/repos/github/damoresa/taskmanager/badge.svg)](https://coveralls.io/github/damoresa/taskmanager)
[![SonarCloud Status](https://sonarcloud.io/api/badges/gate?key=taskmanager)](https://sonarcloud.io/dashboard?id=taskmanager)

Task management application that features an 
[_Angular_ frontend](https://github.com/damoresa/taskmanager-frontend) 
and a _NodeJS_ backend with a _MongoDB_ database.  
The backend is designed to be deployed on [Heroku](https://www.heroku.com) 
on a free or hobby dyno and is thought for individual use - as in one 
user per application instance as of 28/11/2017 - so most of it's 
provided tooling is either used or recommended. On the other hand, the 
frontend is designed to be deployed on any CDN like [surge](https://surge.sh/). 
  
As of 2/12/2017 the application supports a very simple _JWT_ authentication 
pattern, with expiry yet to be implemented. Also, tasks / projects are still 
global so the application is designed for a single user. In the future I may 
consider adding a user to project relationship, but that's out of the scope now. 
  
As of 5/12/2017 the application goes through _TravisCI_ and _Coveralls_ 
and is automatically deployed to an _Heroku_ staging environment.

As of 25/12/2017 _SonarCloud_ support has been implemented.
  
The purpose of the application is to actually help myself manage 
my own time in order to be able to analyze certain scenarios.
  
  
### Project structure
  
The project contains the following folders:
* __Constants__: as it may be obvious, contains contants such as the 
database connection string.
* __Controllers__: _Express_ controllers.
* __Models__: _Mongoose_ models.
  
  
### Frontend
  
As of 5/12/2017 the frontend has been moved away from this repository and can 
be found [here](https://github.com/damoresa/taskmanager-frontend).
  
  
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
* _npm run devStart_: start _nodemon_ process in order to enable 
_hot reloading_ while implementing new features.
* _npm start_: start the backend application on production mode.