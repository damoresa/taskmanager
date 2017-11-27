## Angular application

This project features a small _Angular_ application, built using the 
following tools:

* __Angular__: Small application displaying routing and reactive forms 
usage. This application includes _lazy loading_ and _ahead of time (AOT)_ 
compilation.
* __Webpack__: Used to package the _Angular_ application and the static 
resources, generating a package that will be distributed by the backend 
as static content.

The _Angular_ application features the following components:

* __Router__: simple routing and _lazy_ routing.
* __Forms__: reactive forms with validations.
* __Common__: image and directive usages.
* __Http__: http requests and _RxJS_ usage.
* __Components__: contains _grid_, _pagination_, _toast_ and _modal_ 
reusable and configuratble components.

In order to execute locally, run the following script under the _ng2_ folder:

```bash
npm start
```

In order to build the sources and access them through the _NodeJS_ backend, run 
the following script:

```bash
npm run build:production
```

In case you want to use _AOT_ compilation, run this script instead:

```bash
npm run build:production:aot
```