## Task manager

Task management application that features an _Angular_ frontend and 
a _NodeJS_ backend with a _MongoDB_ database.  
The application is designed to be deployed on [Heroku|] on a free or 
hobby dyno and is thought for individual use - as in one user per 
application instance as of 28/11/2017 - so most of it's provided tooling 
is either used or recommended.
  
  
The purpose of the application is to actually help myself manage 
my own time in order to be able to analyze certain scenarios.
  
  
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
* Single user authentication using _JWT_ and _OAuth_ together with 
_passport_.