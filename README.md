Language Beyonic
================

Language Pack for building expressions and operations for working with
the [beyonic API](http://apidocs.beyonic.com/).

Documentation
-------------
## Payments API

#### `createPayment(...)`
```js
createPayment(fields(
  field("dataSet", "pBOMPrpg1QX"),
  field("orgUnit", "DiszpKrYNg8"),
  field("period", "201401"),
  field("completeData", dataValue("date"))
))
```

Development
-----------

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `make`.
