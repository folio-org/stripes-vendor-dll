# Stripes Vendor Dll

Copyright (C) 2017-2021 The Open Library Foundation

This software is distributed under the terms of the Apache License,
Version 2.0. See the file "[LICENSE](LICENSE)" for more information.


## Introduction

Stripes Vendor Dll is a tool which can be used to create a [DLL bundle](https://webpack.js.org/plugins/dll-plugin/). The bundle currently includes all 3rd party dependencies (react, moment, etc) found in [stripes](https://github.com/folio-org/stripes/blob/master/package.json) plus couple additional stripes dependencies (stripes-components, stripes-connect,stripes-logger,stripes-util).

## How to use it:

There are two way to consume it:

* Add `@folio/stripes-vendor-dll` to `package.json` (under `devDependencies` or `dependencies` if `NODE_ENV=production` is used) in the ui module / platform you want to build:

  ````
  "@folio/stripes-vendor-dll": "1.0.0"
  ````

  Then yarn it and run:

  ````
  stripes build ./stripes.config.js --useDll ./node_modules/@folio/stripes-vendor-dll/output/stripesVendorDll.json
  ````

* Clone stripes-vendor-dll from [https://github.com/folio-org/stripes-vendor-dll](https://github.com/folio-org/stripes-vendor-dll) and run:

  ````
  cd ./stripes-vendor-dll && yarn && yarn build
  ````

  Then from the module or platform folder run:

  ````
  stripes build ./stripes.config.js --useDll ../stripes-vendor-dll/output/stripesVendorDll.json
  ````


## Additional information

See project [STRIPES](https://issues.folio.org/browse/STRIPES)
at the [FOLIO issue tracker](https://dev.folio.org/guidelines/issue-tracker/).

Other FOLIO Developer documentation is at [dev.folio.org](https://dev.folio.org/)

