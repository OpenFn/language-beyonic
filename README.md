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
  field("phonenumber", "+256773712831"),
  field("first_name", "+256773712831"),
  field("last_name", "+256773712831"),
  field("amount", 100.2),
  field("currency", "UGX"),
  field("account", 1),
  field("description", "+256773712831"),
  field("payment_type", "+256773712831"),
  field("callback_url", "+256773712831"),
  field("metadata.id", 1234),
  field("metadata.name", "Lucy")
))
```

Development
-----------

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `make`.
