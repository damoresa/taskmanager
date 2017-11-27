## Thin2.0 workshop ##

This project features a small _Thin2.0_ sample, using the following tools:

* __Angular2__: Small application showcase displaying routing, forms management and service mocking. This application includes _lazy loading_ and _ahead of time (AOT)_ compilation.
* __Webpack__: Used to package the _Angular2_ application and deliver the distributable objects into the _NOVA_ microservice.

The _Angular2_ application features the following components:

* __Router__: simple routing and _lazy_ routing examples.
* __Forms__: simple forms submit and validation examples.
* __Common__: image and directive usages.
* __Http__: simple http requests and _RxJS_ usage.
* __Thin2.0 components__: integrated with _Thin2.0's_ _config_, _grid_, _pagination_, _logger_ and _auth_ components.

In order to execute locally, run the following script under the _thin2-fe_ folder:

```bash
npm start
```

In order to build the sources and access them through _Zuul_ and the _NOVA_ microservice, run the following script under the _thin2-fe_ folder:

```bash
npm run build:production
```
