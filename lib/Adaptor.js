'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastReferenceValue = exports.dataValue = exports.dataPath = exports.merge = exports.sourceValue = exports.fields = exports.field = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.execute = execute;
exports.createPayment = createPayment;
exports.createContact = createContact;

var _languageCommon = require('language-common');

Object.defineProperty(exports, 'field', {
  enumerable: true,
  get: function get() {
    return _languageCommon.field;
  }
});
Object.defineProperty(exports, 'fields', {
  enumerable: true,
  get: function get() {
    return _languageCommon.fields;
  }
});
Object.defineProperty(exports, 'sourceValue', {
  enumerable: true,
  get: function get() {
    return _languageCommon.sourceValue;
  }
});
Object.defineProperty(exports, 'merge', {
  enumerable: true,
  get: function get() {
    return _languageCommon.merge;
  }
});
Object.defineProperty(exports, 'dataPath', {
  enumerable: true,
  get: function get() {
    return _languageCommon.dataPath;
  }
});
Object.defineProperty(exports, 'dataValue', {
  enumerable: true,
  get: function get() {
    return _languageCommon.dataValue;
  }
});
Object.defineProperty(exports, 'lastReferenceValue', {
  enumerable: true,
  get: function get() {
    return _languageCommon.lastReferenceValue;
  }
});

var _Client = require('./Client');

var _url = require('url');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/** @module Adaptor */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for beyonic.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @constructor
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
function execute() {
  for (var _len = arguments.length, operations = Array(_len), _key = 0; _key < _len; _key++) {
    operations[_key] = arguments[_key];
  }

  var initialState = {
    references: [],
    data: null
  };

  return function (state) {
    return _languageCommon.execute.apply(undefined, operations)(_extends({}, initialState, state));
  };
}

/**
 * Create a payment
 * @example
 * execute(
 *   createPayment(data)
 * )(state)
 * @constructor
 * @param {object} data - Payload data for the payment
 * @returns {Operation}
 */
function createPayment(data) {

  return function (state) {
    var body = (0, _languageCommon.expandReferences)(data)(state);

    var _state$configuration = state.configuration;
    var apiUrl = _state$configuration.apiUrl;
    var apiToken = _state$configuration.apiToken;


    var url = "https://app.beyonic.com/api";
    // const url = resolveUrl(apiUrl + '/payments')

    console.log("Posting payment:");
    console.log(body);

    return (0, _Client.post)({ apiToken: apiToken, body: body, url: url }).then(function (result) {
      console.log("Success:", result);
      return _extends({}, state, { references: [result].concat(_toConsumableArray(state.references)) });
    });
  };
}

/**
 * Create a contact
 * @example
 * execute(
 *   createContact(data)
 * )(state)
 * @constructor
 * @param {object} data - Payload data for the contact
 * @returns {Operation}
 */
function createContact(data) {

  return function (state) {
    var body = (0, _languageCommon.expandReferences)(data)(state);

    var _state$configuration2 = state.configuration;
    var apiUrl = _state$configuration2.apiUrl;
    var apiToken = _state$configuration2.apiToken;


    var url = (0, _url.resolve)(apiUrl + "/contacts");

    console.log("Posting contact:");
    console.log(body);

    return (0, _Client.post)({ apiToken: apiToken, body: body, url: url }).then(function (result) {
      console.log("Success:", result);
      return _extends({}, state, { references: [result].concat(_toConsumableArray(state.references)) });
    });
  };
}
