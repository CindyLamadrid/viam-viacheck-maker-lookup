/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable default-case */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable block-scoped-var */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-prototype-builtins */
/* eslint-disable func-names */
// const WebSocket = require('ws');
//
// Copyright © 2014-2017, Silver Bullet Technology, Inc.
//
module.exports = {
  MakeRanger: function MakeRanger() {
    //= ======START OF INTERNAL FUNCTIONALITY=====================
    // declarations with "var" are private
    const self = this; // use self to access "this" functionality
    let websocket = null;
    let itemData = null;
    let internalRangerStateBuffer = 0; // Using ShutDown as more applications will be compatible but Unknown is more correct.
    let GenericOptionsBuffer = null;
    let DriverOptionsBuffer = null;
    let TransportInfoBuffer = null;
    let ExceptionData = null;
    let IqaData = null;
    let ItemSuspended = false;
    let InShutDownCall = false;
    let GetVersionBuffer = '';

    const objectArray = [];

    const jsonSendId = new jsonSendIdObj();

    //
    // findAndRemoveFromObjectArray() searches through the objectArray for the
    // passed id. If the id is found in objectArray, the object containing the
    // matching id gets spliced and returned. If matching id's are not found,
    // fuction returns an empty array.
    //
    const findAndRemoveFromObjectArray = function(id) {
      let ret = [];

      // Loop through objectArray until matching id is found or to the end of array.
      for (let i = 0; i < objectArray.length && ret.length === 0; i++) {
        if (id === objectArray[i].id) {
          // if id's match
          ret = objectArray.splice(i, 1); // remove and store objectArray[i] to ret
        }
      }
      return ret;
    };

    //
    // SBTConsoleLog() centralizes all console logging and ensures that any one
    //  line logged isn't excessively long.
    //
    // Called with a single parameter, SBTConsoleLog() will just send the text to
    //  the console log.
    //
    // Called with two parameters, SBTConsoleLog() will use console grouping,
    //  if able.
    //
    // Parameters:
    // SBTLogTextIn:                     text to be logged.
    // [SBTConsoleGroupFlag] (optional): 0 (default) no grouping
    //                                   1 (begin a new console group, if able)
    //                                   2 (end the current console group, if able)
    //
    const SBTConsoleLog = function(SBTLogTextIn) {
      if (typeof console === 'undefined') {
        WriteRRSLogDebugMessage('ERROR: No console defined in web browser!');
        return;
      }

      let SBTLogTextOut = '';
      try {
        if (SBTLogTextIn.length > 180) {
          // To prevent cluttering the console log, no single console log entry
          // may exceed 180 characters.
          SBTLogTextOut = `${SBTLogTextIn.substr(0, 180)}(truncated)`;
        } else {
          SBTLogTextOut = SBTLogTextIn;
        }
      } catch (err) {
        console.log(err);
      }

      let SBTConsoleGroupFlag = 0; // Default
      if (arguments.length === 2) {
        // The call specified a console group (begin/end) request.

        SBTConsoleGroupFlag = arguments[1];
      }

      if (SBTConsoleGroupFlag === 0) {
        // SBTConsoleLog() called without grouping specified, so just log it.
        // console.log(SBTLogTextOut);

        return; // Finished.
      }

      if (SBTConsoleGroupFlag === 1) {
        // New console group requested.

        if (typeof console.group !== 'undefined') {
          // Console group is supported, so begin a new console group, and log.
          console.group(SBTLogTextOut);
        } else {
          // Console grouping is not supported, so just log.
          // console.log(SBTLogTextOut);
        }

        return; // Finished.
      }

      if (SBTConsoleGroupFlag === 2) {
        // End console group requested, so log the given text, then attempt to end
        // the current console group.

        // console.log(SBTLogTextOut); //First, do the logging regardless.

        if (typeof console.groupEnd !== 'undefined') {
          // Console group end is supported, so end the current console group.
          console.groupEnd();
        }

        // Finished.
      }

      // console.log("ERROR: second argument of SBTConsoleLog must only be a number type, with a value of 1 or 2");
    };

    // Creates a comma separated string of unregistered events.
    const BuildListOfUnregisteredEvents = function() {
      let eventListString = '';

      if (self.TransportNewState === null) {
        eventListString += 'TransportNewState,';
      }

      if (self.TransportIsDead === null) {
        eventListString += 'TransportIsDead,';
      }

      if (self.TransportStartingUp === null) {
        eventListString += 'TransportStartingUp,';
      }

      if (self.TransportChangeOptions === null) {
        eventListString += 'TransportChangeOptions,';
      }

      if (self.TransportEnablingOptions === null) {
        eventListString += 'TransportEnablingOptions,';
      }

      if (self.TransportReadyToFeed === null) {
        eventListString += 'TransportReadyToFeed,';
      }

      if (self.TransportExceptionInProgress === null) {
        eventListString += 'TransportExceptionInProgress,';
      }

      if (self.TransportExceptionComplete === null) {
        eventListString += 'TransportExceptionComplete,';
      }

      if (self.TransportFeeding === null) {
        eventListString += 'TransportFeeding,';
      }

      if (self.TransportShuttingDown === null) {
        eventListString += 'TransportShuttingDown,';
      }

      if (self.TransportShutDown === null) {
        eventListString += 'TransportShutDown,';
      }

      if (self.TransportFeedingStopped === null) {
        eventListString += 'TransportFeedingStopped,';
      }

      if (self.TransportNewItem === null) {
        eventListString += 'TransportNewItem,';
      }

      if (self.TransportSetItemOutput === null) {
        eventListString += 'TransportSetItemOutput,';
      }

      if (self.TransportItemInPocket === null) {
        eventListString += 'TransportItemInPocket,';
      }

      if (self.TransportPassThroughEvent === null) {
        eventListString += 'TransportPassThroughEvent,';
      }

      if (self.TransportTrackIsClear === null) {
        eventListString += 'TransportTrackIsClear,';
      }

      if (self.TransportItemIsSuspended === null) {
        eventListString += 'TransportItemIsSuspended,';
      }

      if (self.TransportReadyToSetEndorsement === null) {
        eventListString += 'TransportReadyToSetEndorsement,';
      }

      // eventListString += "FakeEvent,"; //For debugging purposes

      SendNotificationRequestObj(
        'HandleAllUnregisteredEvents',
        'UnregisteredEventList',
        eventListString
      );
    };

    // holds an ID and Ranger call for objectArray.
    const jsonRpcRequestIdAndMethod = function(returnID, returnMethod) {
      this.id = returnID;
      this.method = returnMethod;
    };

    // ID object that holds the initial, current, and maximum ID value permitted.
    function jsonSendIdObj() {
      this.initialIdValue = 0;
      this.incrementIdValue = 1;
      this.maximumValue = 4294967295; // Max 32-bit safe number.

      this.currentValue = this.initialIdValue;

      // getNextId() returns the next ID, in sequence. up to the maximum value
      // allowed.
      this.getNextId = function() {
        if (this.currentValue === this.maximumValue) {
          // The current value of the ID is the max value allowed, so wrap/reset to 0.
          this.currentValue = 0;
        }
        this.currentValue += this.incrementIdValue;

        return this.currentValue;
      };
    }

    //
    // GetJSONRPC2_0BaseObj() returns the base object for requests and responses.
    //
    // Parameters: N/A
    //
    const GetJSONRPC2_0BaseObj = function() {
      return { jsonrpc: '2.0' };
    };

    //
    // StringifyAndSendJSON() stringifies and sends the JSON object param.
    //
    // Parameters:
    //  obj: the JSON object to be stringified and sent.
    //
    const StringifyAndSendJSON = function(obj) {
      const str = JSON.stringify(obj);
      SBTConsoleLog(`Sending TEXT: ${str}`);
      doSend(str);
    };

    //
    // WriteRRSLogDebugMessage() causes a "WriteRRSLogDebugMessage" notification
    //  request to be sent.
    //
    // Parameters:
    //  debugMessage: the text for "WriteRRSLogDebugMessage" to log.
    //
    var WriteRRSLogDebugMessage = function(debugMessage) {
      SendNotificationRequestObj(
        'WriteRRSLogDebugMessage',
        'Text',
        debugMessage
      );
    };

    //
    // SendResultResponseObj() is the generic result response handler.
    //
    // Parameters:
    //  id:     the "id" value of the respective method request.
    //  result: the result value returned by the associated method.
    //
    const SendResultResponseObj = function(id, result) {
      BuildAndSendJSONRpcResponseObj('result', id, result);
    };

    //
    // SendErrorResponseObj() is the generic error response handler.
    //
    // Parameters:
    //  id:      the "id" value (if available) of the respective method request,
    //             or null if the value is not available.
    //  code:    the error code returned by the associated method.
    //  message: the error text/message associated with the error code.
    //
    const SendErrorResponseObj = function(id, code, message) {
      BuildAndSendJSONRpcResponseObj('error', id, code, message);
    };

    //
    // SendNotificationRequestObj() is the generic notification request handler.
    //
    // Parameters:
    //  methodName:     the method to be invoked.
    // [...](optional): for notification requests with parameters, the params are
    //                    received as key/value pairs.
    //
    var SendNotificationRequestObj = function(methodName) {
      // arguments will be translated to array in BuildAndSendJSONRpcRequestObj()
      BuildAndSendJSONRpcRequestObj('notification', methodName, arguments);
    };

    //
    // SendMethodRequestObj() is the generic method request handler.
    //
    //  methodName:     the method to be invoked.
    // [...](optional): for method requests with parameters, the params are
    //                    received as key/value pairs.
    //
    const SendMethodRequestObj = function(methodName) {
      // arguments will be translated to array in BuildAndSendJSONRpcRequestObj()
      BuildAndSendJSONRpcRequestObj('method', methodName, arguments);
    };

    //
    // BuildAndSendJSONRpcRequestObj() handles (builds and sends) all requests.
    //
    // Parameters:
    // requestType:      the type of request, "method" or "notification".
    // methodName:       the info to be set for request object member "method".
    // [...](optional):  for requests with parameters, the params are received
    //                     as key/value pairs.
    //
    var BuildAndSendJSONRpcRequestObj = function(
      requestType,
      methodName,
      theArgs
    ) {
      const jsonRpcObj = GetJSONRPC2_0BaseObj(); // Get base obj.
      jsonRpcObj.method = methodName;

      if (theArgs.length > 2) {
        // The request includes parameters.

        jsonRpcObj.params = {}; // Create the nested "params" object.

        // Add params to jsonRpcObj. Each iteration adds a key value pair into the
        // nested "params" object.
        for (let i = 1; i < theArgs.length - 1; i += 2) {
          // jsonRpcObj.params[theArgs[i]] dynamically creates a new "params"
          // object property (key). theArgs[i+1] is the value for that key.
          jsonRpcObj.params[theArgs[i]] = theArgs[i + 1];
        }
      }

      if (requestType === 'method') {
        // This is a "method" request, so get a new/unique request id and
        // create/push a new request tracking object onto the queue.
        // notification requests do not get an id, and are not tracked.

        // Get the new/unique id, and add it to the request object.
        jsonRpcObj.id = jsonSendId.getNextId();

        // Create the object to be pushed onto the request tracking queue.
        const pushJsonRequest = new jsonRpcRequestIdAndMethod(
          jsonRpcObj.id,
          methodName
        );
        objectArray.push(pushJsonRequest); // Push onto queue.
      } else if (requestType !== 'notification') {
        SBTConsoleLog(
          'Invalid request object type.. Failed to generate proper request object'
        );
        return;
      }

      StringifyAndSendJSON(jsonRpcObj); // Stringify object and send request.
    };

    //
    // BuildAndSendJSONRpcResponseObj() handles (builds and sends) all responses.
    //
    // Parameters:
    // responseType: the type of response, "result" or "error".
    //  id:          the "id" value (if available) of the respective method
    //                 request, or null if the value is not available.
    // arguments[2]: the "result" response's value, or the "error" response's
    //                 object members ("code" and "message").
    //
    var BuildAndSendJSONRpcResponseObj = function(responseType, id) {
      if (arguments.length < 3) {
        // Insufficient arguments provided... unable to build a response object.

        SBTConsoleLog('Too few arguments to generate proper response object.');

        return;
      }

      const jsonRpcObj = GetJSONRPC2_0BaseObj(); // Get base obj.

      if (responseType === 'result') {
        // This is a "result" response object.

        // Create the "result" key and assign the value provided.
        jsonRpcObj.result = arguments[2];
      } else if (responseType === 'error' && arguments.length > 3) {
        // This is a "error" response object.

        jsonRpcObj.error = {}; // Create the nested "error" object.

        // Create, and set the value to, the error "code" member.
        jsonRpcObj.error.code = arguments[2];

        // Create, and set the value to, the error "message member.
        jsonRpcObj.error.message = arguments[3];
      } else {
        // Either the responseType is not recognized, or too few params were
        // provided for this "error" response.

        SBTConsoleLog(
          'Invalid response object type.. Failed to generate proper response object'
        );
        return;
      }

      jsonRpcObj.id = id; // Create, and set the value to, the "id" member.

      StringifyAndSendJSON(jsonRpcObj); // Stringify object and send request.
    };

    const logMethodCalled = function(methodName, args) {
      let argString = '';
      for (let i = 0; i < args.length; i++) {
        argString += args[i];
        if (i + 1 !== args.length) argString += ', ';
      }
      SBTConsoleLog(`Ranger_${methodName}( ${argString} ) called`);
    };
    const logMethodReturn = function(methodName, args, ret) {
      let argString = '';
      for (let i = 0; i < args.length; i++) {
        argString += args[i];
        if (i + 1 !== args.length) argString += ', ';
      }
      SBTConsoleLog(
        `Ranger_${methodName}( ${argString} ) returned ${
          ret === undefined ? '' : ret.toString().substr(0, 40)
        }`
      );
    };
    const CallCallbackAndLog = function(name, theFunction) {
      if (typeof theFunction !== 'function') {
        if (self.ReportCallbacksThatAreNotMapped)
          SBTConsoleLog(`The Callback [${name}] is not mapped`);
        return;
      }

      let argString = '';
      if (arguments.length === 3 && arguments[2] instanceof MessageEvent) {
        try {
          if (arguments[2].data.length > 80) {
            // Truncate excessively long arguments (like base64 images) to avoid
            // cluttering the console log.
            argString = `${arguments[2].data.substr(0, 80)}(truncated)`;
          } else {
            argString = arguments[2].data;
          }
        } catch (err) {
          SBTConsoleLog(err);
        }
      } else {
        for (let i = 2; i < arguments.length; i++) {
          argString += arguments[i];
          if (i + 1 !== arguments.length) argString += ', ';
        }
      }

      // addNewStateRanger
      // Log the method call, and begin the console group.
      SBTConsoleLog(`Ranger_${name}( ${argString} ) called`, 1);

      try {
        // theFunction.apply(this, arguments.slice(2));
        const args = Array.prototype.slice.call(arguments).slice(2);
        theFunction.apply(this, args);
      } catch (err) {
        SBTConsoleLog(err);
      }

      // Log the method call, and end the console group.
      SBTConsoleLog(`Ranger_${name}( ${argString} ) returned`, 2);
    };
    // -----websocket callbacks---------
    const onopen = function(evt) {
      SBTConsoleLog('Ranger_OnOpen status received.');
      CallCallbackAndLog('OnOpenCallback', self.OnOpenCallback, evt);

      BuildListOfUnregisteredEvents();

      SendMethodRequestObj('GetTransportState');
      SendMethodRequestObj('GetVersion');
      SendMethodRequestObj('StartUp');
    };
    const onclose = function(evt) {
      SBTConsoleLog('Ranger_OnClose status received.');
      CallCallbackAndLog('OnCloseCallback', self.OnCloseCallback, evt);
      websocket = null;
    };
    const onmessage = function(evt) {
      CallCallbackAndLog('OnMessageCallback', self.OnMessageCallback, evt);

      try {
        var messageData = JSON.parse(evt.data);
      } catch (err) {
        SBTConsoleLog('ERROR: parse error on incoming JSON!');

        SendErrorResponseObj(null, -32700, 'Parse error');
      }
      if (messageData.hasOwnProperty('jsonrpc') === false) {
        WriteRRSLogDebugMessage(
          'Parsed string does not contain jsonrpc. Not up to JSONRPC 2.0 specs'
        );
        return;
      }

      if (messageData.jsonrpc !== '2.0') {
        // if it's jsonrpc 2.0
        WriteRRSLogDebugMessage(
          'Parsed string does not contain 2.0. Not up to JSONRPC 2.0 specs'
        );
        return;
      }

      // id required (Notification not supported).
      if (messageData.hasOwnProperty('id') === false) {
        var errorString = `ERROR: JSON object missing ID property: ${JSON.stringify(
          messageData
        )}`;
        SBTConsoleLog(errorString);
        WriteRRSLogDebugMessage(errorString);
        return;
      }

      // if this is an event
      if (messageData.hasOwnProperty('method')) {
        let methodNotFound = false;
        try {
          // We want to make sure to release any event so place a try catch around all handling
          switch (messageData.method) {
            case 'TransportNewItem':
              itemData = messageData.params;
              CallCallbackAndLog(messageData.method, self.TransportNewItem);
              itemData = null;
              break;
            case 'TransportItemInPocket':
              itemData = messageData.params;
              if (messageData.params.hasOwnProperty('IQA'))
                IqaData = messageData.params.IQA;
              CallCallbackAndLog(
                messageData.method,
                self.TransportItemInPocket,
                itemData.ItemID
              );
              itemData = null;
              IqaData = null;
              break;
            case 'TransportSetItemOutput':
              itemData = messageData.params;
              if (messageData.params.hasOwnProperty('IQA'))
                IqaData = messageData.params.IQA;
              CallCallbackAndLog(
                messageData.method,
                self.TransportSetItemOutput,
                itemData.ItemID
              );
              itemData = null;
              IqaData = null;
              break;
            case 'TransportReadyToSetEndorsement':
              itemData = messageData.params;
              CallCallbackAndLog(
                messageData.method,
                self.TransportReadyToSetEndorsement,
                messageData.params.SideNumber,
                messageData.params.EndorseMode
              );
              itemData = null;
              // for current item endorsing efficiency may be gained
              // by leaving the item data for SetItemOutput and not resending the same data.
              // another option is to not send image data at this point.
              break;
            case 'TransportPassThroughEvent':
              CallCallbackAndLog(
                messageData.method,
                self.TransportPassThroughEvent,
                messageData.params.EventName,
                messageData.params.EventArguments
              );
              break;
            case 'TransportNewState':
              internalRangerStateBuffer = messageData.params.NewState;
              // if the new state is ChangeOptionsState or ReadyToFeedState.
              if (internalRangerStateBuffer === 2) {
                // "TransportChangeOptions"
                // update the buffers
                GenericOptionsBuffer = messageData.params.GenericOptions;
                DriverOptionsBuffer = messageData.params.DriverOptions;
                TransportInfoBuffer = messageData.params.TransportInfo;
              }
              // if the new state is ReadyToFeedState.
              if (internalRangerStateBuffer === 4) {
                // "TransportReadyToFeed"
                // update the buffers
                GenericOptionsBuffer = messageData.params.GenericOptions;
                DriverOptionsBuffer = messageData.params.DriverOptions;
              }
              if (internalRangerStateBuffer === 6)
                // "TransportExceptionInProgress"
                ExceptionData = messageData.params;

              CallCallbackAndLog(
                messageData.method,
                self.TransportNewState,
                messageData.params.NewState,
                messageData.params.PreviousState
              );
              break;
            case 'TransportFeeding':
              CallCallbackAndLog(messageData.method, self.TransportFeeding);
              break;
            case 'TransportReadyToFeed':
              CallCallbackAndLog(
                messageData.method,
                self.TransportReadyToFeed,
                messageData.params.PreviousState
              );
              break;
            case 'TransportFeedingStopped':
              CallCallbackAndLog(
                messageData.method,
                self.TransportFeedingStopped,
                messageData.params.Reason,
                messageData.params.ItemsFed,
                messageData.params.ItemsRequested
              );
              break;
            case 'TransportStartingUp':
              CallCallbackAndLog(messageData.method, self.TransportStartingUp);
              break;
            case 'TransportIsDead':
              CallCallbackAndLog(messageData.method, self.TransportIsDead);
              break;
            case 'TransportExceptionInProgress':
              ExceptionData = messageData.params;
              CallCallbackAndLog(
                messageData.method,
                self.TransportExceptionInProgress
              );
              ExceptionData = null;
              break;
            case 'TransportExceptionComplete':
              ExceptionData = messageData.params;
              CallCallbackAndLog(
                messageData.method,
                self.TransportExceptionComplete
              );
              ExceptionData = null;
              break;
            case 'TransportShuttingDown':
              CallCallbackAndLog(
                messageData.method,
                self.TransportShuttingDown
              );
              break;
            case 'TransportShutDown':
              CallCallbackAndLog(messageData.method, self.TransportShutDown);
              if (InShutDownCall === false) {
                GetVersionBuffer = '';
                websocket.close();
              }
              break;
            case 'TransportTrackIsClear':
              CallCallbackAndLog(
                messageData.method,
                self.TransportTrackIsClear
              );
              break;
            case 'TransportEnablingOptions':
              CallCallbackAndLog(
                messageData.method,
                self.TransportEnablingOptions
              );
              break;
            case 'TransportChangeOptions':
              CallCallbackAndLog(
                messageData.method,
                self.TransportChangeOptions,
                messageData.params.PreviousState
              );
              break;
            case 'TransportItemIsSuspended':
              ItemSuspended = true;
              itemData = messageData.params;
              CallCallbackAndLog(
                messageData.method,
                self.TransportItemIsSuspended,
                itemData.ItemID
              );
              break;
            default:
              methodNotFound = true;
          }
        } catch (err) {
          SBTConsoleLog(err);
        }
        // Send release for all events we receive.
        // failure to do so will lock the server.
        if (methodNotFound === true) {
          SendErrorResponseObj(messageData.id, -32601, 'Method not found');
        } else {
          SendResultResponseObj(messageData.id, true);
        }
      }

      // Process return from call
      if (
        messageData.hasOwnProperty('result') ||
        messageData.hasOwnProperty('error')
      ) {
        if (messageData.id !== objectArray[0].id) {
          // if result is asynchronous
          SBTConsoleLog(
            `NOTE: JSON ID's do not match, not synchronous. Msg ID: ${messageData.id}, ObjArray ID: ${objectArray[0].id}`
          );
          WriteRRSLogDebugMessage(
            `NOTE: JSON ID's do not match, not synchronous. Msg ID: ${messageData.id}, ObjArray ID: ${objectArray[0].id}`
          );
        }

        const returnedArrayValue = findAndRemoveFromObjectArray(messageData.id);
        if (returnedArrayValue.length === 0) {
          // if findAndRemoveFromObjectArray() returned an empty array
          SBTConsoleLog(
            `ERROR: Ranger.js received an unrecognized response ID! Msg ID: ${messageData.id}`
          );
          WriteRRSLogDebugMessage(
            `ERROR: Ranger.js received an unrecognized response ID! Msg ID: ${messageData.id}`
          );
          return;
        }

        if (messageData.hasOwnProperty('result')) {
          const jsonCallReturnExpected = returnedArrayValue[0].method;
          switch (jsonCallReturnExpected) {
            case 'StartUp':
              if (messageData.result == 'false')
                if (
                  internalRangerStateBuffer === 0 ||
                  internalRangerStateBuffer === -1
                )
                  // if StartUp reply is false
                  // and if we are not already started up
                  try {
                    websocket.close();
                  } catch (err) {
                    SBTConsoleLog(err);
                  } // attempt to close any websocket connection
              break;
            case 'ShutDown':
              InShutDownCall = false;
              if (messageData.result == 'true') {
                GetVersionBuffer = '';
                websocket.close();
              }
              break;
            case 'GetTransportState':
              internalRangerStateBuffer = parseInt(messageData.result);
              break;
            case 'GetGenericOptionFileName':
              GenericOptionsBuffer = messageData.params.GenericOptions;
              break;
            case 'SetDriverOptionFileName':
              DriverOptionsBuffer = messageData.params.DriverOptions;
              break;
            case 'GetVersion':
              GetVersionBuffer = messageData.result;
              break;
          }

          // Create the Callback status object to be sent to the application.
          // Format ex: {CallReturn:"GetTransportState", Value:"0"}
          const RangerCallbackStatusObj = {
            CallReturn: jsonCallReturnExpected,
            Value: messageData.result
          };

          CallCallbackAndLog(
            'RangerCallStatusCallback',
            self.RangerCallStatusCallback,
            RangerCallbackStatusObj
          );
        } else {
          // Execution of this scope indicates a JSON error object was received.

          var errorString = 'ERROR: JSON RPC error object received from RRS!';

          if (messageData.error.hasOwnProperty('message')) {
            errorString = `${errorString} ${messageData.error.message}`;
          }

          SBTConsoleLog(errorString);
        }
      }
    };
    const onerror = function(evt) {
      SBTConsoleLog('Ranger_OnError status received.');
      CallCallbackAndLog('OnErrorCallback', self.OnErrorCallback, evt);
    };
    var doSend = function(message) {
      try {
        if (
          websocket.readyState === websocket.CLOSED ||
          websocket.readyState === websocket.CLOSING
        ) {
          // websocket.onopen = onopen;
          CallCallbackAndLog(
            'OnLostConnectionEvent',
            self.OnLostConnectionEvent,
            null
          );
          return;
        }

        websocket.send(message);
      } catch (err) {
        console.log('busy ' + err);
        CallCallbackAndLog(
          'OnBusyWebSocketEvent',
          self.OnBusyWebSocketEvent,
          null
        );
      }
    };
    // --------Internal Calls----------
    const GetReaderInfo = function(reader, json) {
      try {
        return json[`Reader${reader}`];
      } catch (err) {
        SBTConsoleLog(err);
      }

      return '';
    };
    const GetSideDataString = function(side) {
      if (typeof side === 'number') {
        switch (side) {
          case 0:
            return 'Front';
          case 1:
            return 'Rear';
        }
      }
      return 'Invalid Side';
    };

    const GetImageColorTypeString = function(color) {
      if (typeof color === 'number') {
        switch (color) {
          case 0:
            return 'Bitonal';
          case 1:
            return 'Grayscale';
          case 2:
            return 'Color';
          case 3:
            return 'Ultraviolet';
          case 4:
            return 'BitonalUV';
          case 5:
            return 'GrayscaleUV';
        }
      }
      return 'Invalid Color';
    };

    const GetIQATestString = function(test) {
      if (typeof test === 'number') {
        switch (test) {
          case 0:
            return 'InvalidID';
          case 1:
            return 'UndersizeImage';
          case 2:
            return 'OversizeImage';
          case 3:
            return 'BelowMinCompressedSize';
          case 4:
            return 'AboveMaxCompressedSize';
          case 5:
            return 'FrontRearDimensionMismatch';
          case 6:
            return 'HorizontalStreaks';
          case 7:
            return 'ImageTooLight';
          case 8:
            return 'ImageTooDark';
          case 9:
            return 'CarbonStrip';
          case 10:
            return 'FramingError';
          case 11:
            return 'ExcessiveSkew';
          case 12:
            return 'TornEdges';
          case 13:
            return 'TornCorners';
          case 14:
            return 'SpotNoise';
        }
      }
      return 'Invalid ID';
    };

    //= ======END OF INTERNAL FUNCTIONALITY=====================
    //= ======Start of External Functionality (for use in Application)==========

    this.wsUrl = '';
    // Set this to the WebSocket URL to be used for the connection
    // Example 1 Normal connenction at port 9002
    //  myRanger.wsUrl = "ws://127.0.0.1:9002";
    // Example 2 SSL Connection at port 9003
    //  myRanger.wsUrl = "wss://127.0.0.1:9003";

    this.OnOpenCallback = null;
    this.OnCloseCallback = null;
    this.OnErrorCallback = null;
    this.OnMessageCallback = null;
    // These are used to provide websocket status to the applciation.
    // They correlate to the WebSocket EventListener with the same name minus "Callback"
    // Protype: void handleEvent( in nsIDOMEvent event );
    // Reference

    this.ReportCallbacksThatAreNotMapped = false;
    // For Debugging purposes only.  Enables logging of callbacks
    // that are not set by the application.  Only logs when the callback is called.
    // Example to enable
    //  myRanger.ReportCallbacksThatAreNotMapped = true;

    // Ranger Callbacks
    // Register these callbacks to your application functions.  ProtoType show number of
    // expected arguments and the type of arguments.  Reference RangerConstants.h for values.
    this.TransportNewState = null;
    // ProtoType: void handleEvent( number , number );
    this.TransportIsDead = null;
    // ProtoType: void handleEvent( );
    this.TransportStartingUp = null;
    // ProtoType: void handleEvent( );
    this.TransportChangeOptions = null;
    // ProtoType: void handleEvent( number );
    this.TransportEnablingOptions = null;
    // ProtoType: void handleEvent( );
    this.TransportReadyToFeed = null;
    // ProtoType: void handleEvent( number );
    this.TransportExceptionInProgress = null;
    // ProtoType: void handleEvent( );
    this.TransportExceptionComplete = null;
    // ProtoType: void handleEvent( );
    this.TransportFeeding = null;
    // ProtoType: void handleEvent( );
    this.TransportShuttingDown = null;
    // ProtoType: void handleEvent( );
    this.TransportShutDown = null;
    // ProtoType: void handleEvent( );
    this.TransportFeedingStopped = null;
    // ProtoType: void handleEvent( number , number , number );
    this.TransportNewItem = null;
    // ProtoType: void handleEvent( );
    this.TransportSetItemOutput = null;
    // ProtoType: void handleEvent( number );
    this.TransportItemInPocket = null;
    // ProtoType: void handleEvent( number );
    this.TransportPassThroughEvent = null;
    // ProtoType: void handleEvent( string , string );
    this.TransportTrackIsClear = null;
    // ProtoType: void handleEvent( );
    this.TransportItemIsSuspended = null;
    // ProtoType: void handleEvent( number );
    this.TransportReadyToSetEndorsement = null;
    // ProtoType: void handleEvent( number , number );
    this.OnLostConnectionEvent = null;
    // ProtoType: void handleEvent( );
    this.OnBusyWebSocketEvent = null;
    // ProtoType: void handleEvent( );

    // ----Special Ranger API callback for WebSocket interface----
    this.RangerCallStatusCallback = null;
    // Provides Server feedback to Ranger Calls.  Use this to get return values of calls made to the server.
    // ProtoType void handleEvent( CallbackStatusObj );
    //
    //  Parameter 1: A JSON object containing return call name, "CallReturn",
    //               and return value, "Value". Also may contain other
    //               related information.
    //    Example of CallbackStatusObj: {CallReturn:"GetTransportState", Value:"0"}

    //= ======Ranger Calls========
    // -----Start of Ranger calls that are sent directly to server------
    // Note: RETURN VALUES FROM THESE CALLS WILL BE RETURNED USING THE "RangerCallStatusCallback".
    this.StartUp = function() {
      logMethodCalled('Startup', arguments);
      // This is a special case where we open the socket before calling StartUp.
      // The purpose to this implementation is to not require additional calls from the application
      // ShutDown will disconnect.

      if (websocket !== null) {
        SBTConsoleLog(
          'Ranger_Websocket has already been created.  Sending StartUp msg directly to server.'
        );
        SendMethodRequestObj('StartUp');
      } else {
        SBTConsoleLog(
          'Ranger_Websocket has not been created. Creating now. StartUp msg will be sent in OnOpen.'
        );
        SBTConsoleLog(`new WebSocket(${self.wsUrl})`);
        websocket = new WebSocket(self.wsUrl);
        websocket.onopen = onopen;
        websocket.onclose = onclose;
        websocket.onmessage = onmessage;
        websocket.onerror = onerror;
      }

      // we will call Ranger Startup on connection
      logMethodReturn('Startup', arguments);
    };
    this.StopFeeding = function() {
      logMethodCalled('StopFeeding', arguments);
      if (websocket === null) {
        logMethodReturn('StopFeeding', arguments);
        return;
      }
      SendMethodRequestObj('StopFeeding');
      logMethodReturn('StopFeeding', arguments);
    };
    this.ShutDown = function() {
      logMethodCalled('ShutDown', arguments);
      // This is a special case where we shutdown the connnection after completeing shutdown.
      // The purpose to this implementation is to not require additional calls from the application
      if (websocket === null) {
        logMethodReturn('ShutDown', arguments);
        return;
      }

      InShutDownCall = true; // set to false when recieve reply.
      SendMethodRequestObj('ShutDown');
      logMethodReturn('ShutDown', arguments);
    };
    this.EnableOptions = function EnableOptions() {
      logMethodCalled('EnableOptions', arguments);
      if (websocket === null) {
        logMethodReturn('EnableOptions', arguments);
        return;
      }
      SendMethodRequestObj('EnableOptions');
      logMethodReturn('EnableOptions', arguments);
    };
    this.StartFeeding = function(source, count) {
      logMethodCalled('StartFeeding', arguments);
      if (websocket === null) {
        logMethodReturn('StartFeeding', arguments);
        return;
      }
      SendMethodRequestObj('StartFeeding', 'Source', source, 'Count', count);
      logMethodReturn('StartFeeding', arguments);
    };
    this.PrepareToChangeOptions = function() {
      logMethodCalled('PrepareToChangeOptions', arguments);
      if (websocket === null) {
        logMethodReturn('PrepareToChangeOptions', arguments);
        return;
      }
      SendMethodRequestObj('PrepareToChangeOptions');
      logMethodReturn('PrepareToChangeOptions', arguments);
    };
    this.ClearTrack = function() {
      logMethodCalled('ClearTrack', arguments);
      if (websocket === null) {
        logMethodReturn('ClearTrack', arguments);
        return;
      }
      SendMethodRequestObj('ClearTrack');
      logMethodReturn('ClearTrack', arguments);
    };
    this.WriteLogDebugMessage = function(Text) {
      logMethodCalled('WriteLogDebugMessage', arguments);
      if (websocket === null) {
        SBTConsoleLog('WriteLogDebugMessage: Websocket is NULL');
      } else {
        SendMethodRequestObj('WriteLogDebugMessage', 'Text', Text);
      }
      logMethodReturn('WriteLogDebugMessage', arguments);
    };
    this.WriteLogErrorMessage = function(Text) {
      logMethodCalled('WriteLogErrorMessage', arguments);
      if (websocket === null) {
        logMethodReturn('WriteLogErrorMessage', arguments);
        return;
      }
      SendMethodRequestObj('WriteLogErrorMessage', 'Text', Text);
      logMethodReturn('WriteLogErrorMessage', arguments);
    };
    this.CallPassthroughMethod = function(MethodString) {
      logMethodCalled('CallPassthroughMethod', arguments);
      if (websocket === null) {
        logMethodReturn('CallPassthroughMethod', arguments);
        return;
      }
      SendMethodRequestObj(
        'CallPassthroughMethod',
        'MethodString',
        MethodString
      );
      logMethodReturn('CallPassthroughMethod', arguments);
    };
    this.GetRangerLogging = function() {
      logMethodCalled('GetRangerLogging', arguments);
      if (websocket === null) {
        logMethodReturn('GetRangerLogging', arguments);
        return;
      }
      SendMethodRequestObj('GetRangerLogging');
      logMethodReturn('GetRangerLogging', arguments);
    };
    this.GetRangerServerLogging = function GetRangerServerLogging() {
      logMethodCalled('GetRangerServerLogging', arguments);
      if (websocket === null) {
        logMethodReturn('GetRangerServerLogging', arguments);
        return;
      }
      SendMethodRequestObj('GetRangerServerLogging');
      logMethodReturn('GetRangerServerLogging', arguments);
    };
    this.SetPassthroughProperty = function(PropertyString, Value) {
      logMethodCalled('SetPassthroughProperty', arguments);
      if (websocket === null) {
        logMethodReturn('SetPassthroughProperty', arguments);
        return;
      }
      SendMethodRequestObj(
        'SetPassthroughProperty',
        'PropertyString',
        PropertyString,
        'Value',
        Value
      );
      logMethodReturn('SetPassthroughProperty', arguments);
    };
    this.GetPassthroughProperty = function(PropertyString) {
      logMethodCalled('GetPassthroughProperty', arguments);
      if (websocket === null) {
        logMethodReturn('GetPassthroughProperty', arguments);
        return;
      }
      SendMethodRequestObj(
        'GetPassthroughProperty',
        'PropertyString',
        PropertyString
      );
      logMethodReturn('GetPassthroughProperty', arguments);
    };
    this.SuspendItem = function() {
      logMethodCalled('SuspendItem', arguments);
      if (websocket === null) {
        logMethodReturn('SuspendItem', arguments);
        return;
      }
      SendMethodRequestObj('SuspendItem');
      logMethodReturn('SuspendItem', arguments);
    };
    this.ContinueItem = function() {
      logMethodCalled('ContinueItem', arguments);
      if (websocket === null) {
        logMethodReturn('ContinueItem', arguments);
        return;
      }
      if (ItemSuspended) {
        ItemSuspended = false;
        itemData = null;
      }
      SendMethodRequestObj('ContinueItem');
      logMethodReturn('ContinueItem', arguments);
    };
    this.IQASetDocType = function(TypeName) {
      logMethodCalled('IQASetDocType', arguments);
      if (websocket === null) {
        logMethodReturn('IQASetDocType', arguments);
        return;
      }
      SendMethodRequestObj('IQASetDocType', 'TypeName', TypeName);
      logMethodReturn('IQASetDocType', arguments);
    };
    this.GetInfo = function(SectionName, ValueName) {
      logMethodCalled('GetInfo', arguments);
      if (websocket === null) {
        logMethodReturn('GetInfo', arguments);
        return;
      }
      SendMethodRequestObj(
        'GetInfo',
        'SectionName',
        SectionName,
        'ValueName',
        ValueName
      );
      logMethodReturn('GetInfo', arguments);
    };
    // -----End of Ranger calls that are sent directly to server------
    // -----Start of Ranger Calls that return buffered item data------
    this.GetMicrText = function(reader) {
      logMethodCalled('GetMicrText', arguments);
      let ret = '';
      try {
        ret = itemData.MicrText[`Reader${reader}`];
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetMicrText', arguments, ret);
      return ret;
    };
    this.GetImageBase64 = function(side, color) {
      logMethodCalled(' GetImageBase64', arguments);
      let ret = '';
      try {
        ret =
          itemData.ImageBase64[GetSideDataString(side)][
            GetImageColorTypeString(color)
          ];
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn(' GetImageBase64', arguments, ret);
      return ret;
    };
    this.GetImageAddress = function(side, color) {
      logMethodCalled('GetImageAddress', arguments);
      let ret = 0;
      try {
        ret =
          itemData.ImageAddress[GetSideDataString(side)][
            GetImageColorTypeString(color)
          ];
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetImageAddress', arguments, ret);
      return ret;
    };
    this.GetImageByteCount = function(side, color) {
      logMethodCalled('GetImageByteCount', arguments);
      let ret = 0;
      try {
        ret =
          itemData.ImageByteCount[GetSideDataString(side)][
            GetImageColorTypeString(color)
          ];
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetImageByteCount', arguments, ret);
      return ret;
    };
    this.GetItemFeedSource = function() {
      logMethodCalled('GetItemFeedSource', arguments);
      let ret = -1;
      try {
        ret = itemData.ItemFeedSource;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetItemFeedSource', arguments, ret);
      return ret;
    };
    this.GetTargetLogicalPocket = function() {
      logMethodCalled('GetTargetLogicalPocket', arguments);
      let ret = -1;
      try {
        ret = itemData.TargetLogicalPocket;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetTargetLogicalPocket', arguments, ret);
      return ret;
    };
    this.GetItemID = function() {
      logMethodCalled('GetItemID', arguments);
      let ret = 0;
      try {
        ret = itemData.ItemID;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetItemID', arguments, ret);
      return ret;
    };
    this.GetOcrText = function(reader) {
      logMethodCalled('GetOcrText', arguments);
      let ret = '';
      try {
        ret = itemData.OcrText[`Reader${reader}`];
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetOcrText', arguments, ret);
      return ret;
    };
    this.GetEncodeText = function() {
      logMethodCalled('GetEncodeText', arguments);
      let ret = '';
      try {
        ret = itemData.EncodeText;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetEncodeText', arguments, ret);
      return ret;
    };
    this.GetEndorseText = function(side, lineNumber) {
      logMethodCalled('GetEndorseText', arguments);
      let ret = '';
      try {
        ret =
          itemData.EndorseText[GetSideDataString(side)][`Line${lineNumber}`];
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetEndorseText', arguments, ret);
      return ret;
    };
    this.GetStampNumber = function(side) {
      logMethodCalled('GetStampNumber', arguments);
      let ret = 0;
      try {
        ret = itemData.StampNumber[GetSideDataString(side)];
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetStampNumber', arguments, ret);
      return ret;
    };
    this.GetMicrofilmText = function() {
      logMethodCalled('GetMicrofilmText', arguments);
      let ret = 0;
      try {
        ret = itemData.MicrofilmText;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetMicrofilmText', arguments, ret);
      return ret;
    };
    this.GetMicrofilmBlipType = function() {
      logMethodCalled('GetMicrofilmBlipType', arguments);
      let ret = 0;
      try {
        ret = itemData.MicrofilmBlipType;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetMicrofilmBlipType', arguments, ret);
      return ret;
    };
    this.GetFinalPhysicalPocket = function() {
      logMethodCalled('GetFinalPhysicalPocket', arguments);
      let ret = 0;
      try {
        ret = itemData.FinalPhysicalPocket;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetFinalPhysicalPocket', arguments, ret);
      return ret;
    };
    this.GetItemState = function() {
      logMethodCalled('GetItemState', arguments);
      let ret = 0;
      try {
        ret = itemData.ItemState;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetItemState', arguments, ret);
      return ret;
    };
    this.GetItemReference = function() {
      logMethodCalled('GetItemReference', arguments);
      let ret = 0;
      try {
        ret = itemData.ItemReference;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetItemReference', arguments, ret);
      return ret;
    };
    this.GetImageFileSetDirectory = function() {
      logMethodCalled('GetImageFileSetDirectory', arguments);
      let ret = '';
      try {
        ret = itemData.ImageFileSetDirectory;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetImageFileSetDirectory', arguments, ret);
      return ret;
    };
    this.GetImageFileSetHeaderText = function() {
      logMethodCalled('GetImageFileSetHeaderText', arguments);
      let ret = '';
      try {
        ret = itemData.ImageFileSetHeaderText;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetImageFileSetHeaderText', arguments, ret);
      return ret;
    };
    this.GetImageFileSetName = function() {
      logMethodCalled('GetImageFileSetName', arguments);
      let ret = '';
      try {
        ret = itemData.ImageFileSetName;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetImageFileSetName', arguments, ret);
      return ret;
    };
    this.GetImageFileSetItemText = function() {
      logMethodCalled('GetImageFileSetItemText', arguments);
      let ret = '';
      try {
        ret = itemData.ImageFileSetItemText;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetImageFileSetItemText', arguments, ret);
      return ret;
    };
    // -----End of Ranger Calls that return buffered item data------
    // -----Start of Ranger calls that return buffered IQA data------
    this.IQAAnyTestFailed = function() {
      logMethodCalled('IQAAnyTestFailed', arguments);
      let ret = -1;
      try {
        ret = IqaData.AnyTestFailed;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('IQAAnyTestFailed', arguments, ret);
      return ret;
    };
    this.IQAGetTestResultValue = function(
      SideNumber,
      ColorTypeNumber,
      TestID,
      ResultID
    ) {
      logMethodCalled('IQAGetTestResultValue', arguments);
      let ret = -1;
      try {
        ret =
          IqaData[GetSideDataString(SideNumber)][
            GetImageColorTypeString(ColorTypeNumber)
          ][GetIQATestString(TestID)][`TestResultValue${ResultID}`];
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('IQAGetTestResultValue', arguments, ret);
      return ret;
    };
    this.IQAGetTestFailureCount = function(
      SideNumber,
      ColorTypeNumber,
      TestID
    ) {
      logMethodCalled('IQAGetTestFailureCount', arguments);
      let ret = -1;
      try {
        ret =
          IqaData[GetSideDataString(SideNumber)][
            GetImageColorTypeString(ColorTypeNumber)
          ][GetIQATestString(TestID)].TestFailureCount;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('IQAGetTestFailureCount', arguments, ret);
      return ret;
    };
    this.IQAGetTestFailureID = function(
      SideNumber,
      ColorTypeNumber,
      TestID,
      FailureNumber
    ) {
      logMethodCalled('IQAGetTestFailureID', arguments);
      let ret = -1;
      try {
        ret =
          IqaData[GetSideDataString(SideNumber)][
            GetImageColorTypeString(ColorTypeNumber)
          ][GetIQATestString(TestID)][`FailureNumber${FailureNumber}`]
            .TestFailureID;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('IQAGetTestFailureID', arguments, ret);
      return ret;
    };
    this.IQAGetTestFailureText = function(
      SideNumber,
      ColorTypeNumber,
      TestID,
      FailureNumber
    ) {
      logMethodCalled('IQAGetTestFailureText', arguments);
      let ret = '';
      try {
        ret =
          IqaData[GetSideDataString(SideNumber)][
            GetImageColorTypeString(ColorTypeNumber)
          ][GetIQATestString(TestID)][`FailureNumber${FailureNumber}`]
            .TestFailureText;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('IQAGetTestFailureText', arguments, ret);
      return ret;
    };
    this.IQAGetTestTime = function(SideNumber, ColorTypeNumber, TestID) {
      logMethodCalled('IQAGetTestTime', arguments);
      let ret = -1;
      try {
        ret =
          IqaData[GetSideDataString(SideNumber)][
            GetImageColorTypeString(ColorTypeNumber)
          ][GetIQATestString(TestID)].TestTime;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('IQAGetTestTime', arguments, ret);
      return ret;
    };
    // -----End of Ranger calls that return buffered IQA data------
    // -----Start of Ranger calls that return buffered ini file data-------
    this.GetTransportInfo = function(SectionName, ValueName) {
      logMethodCalled('GetTransportInfo', arguments);
      let ret = '';
      try {
        ret = TransportInfoBuffer[SectionName][ValueName];
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetTransportInfo', arguments, ret);
      return ret;
    };
    this.GetGenericOption = function(SectionName, ValueName) {
      logMethodCalled('GetGenericOption', arguments);
      let ret = '';
      try {
        ret = GenericOptionsBuffer[SectionName][ValueName];
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetGenericOption', arguments, ret);
      return ret;
    };
    this.GetDriverOption = function(SectionName, ValueName) {
      logMethodCalled('GetDriverOption', arguments);
      let ret = '';
      try {
        ret = DriverOptionsBuffer[SectionName][ValueName];
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetDriverOption', arguments, ret);
      return ret;
    };
    // -----End of Ranger calls that return buffered ini file data-------
    // -----Start of Ranger Calls that return general buffered data------
    this.GetTransportState = function() {
      logMethodCalled('GetTransportState', arguments);
      const ret = internalRangerStateBuffer;
      logMethodReturn('GetTransportState', arguments, ret);
      return ret;
    };
    this.GetTransportStateString = function() {
      logMethodCalled('GetTransportStateString', arguments);
      let ret = 'unknown';
      switch (internalRangerStateBuffer) {
        case -1:
          ret = 'TransportUnknownState';
          break;
        case 0:
          ret = 'TransportShutDown';
          break;
        case 1:
          ret = 'TransportStartingUp';
          break;
        case 2:
          ret = 'TransportChangeOptions';
          break;
        case 3:
          ret = 'TransportEnablingOptions';
          break;
        case 4:
          ret = 'TransportReadyToFeed';
          break;
        case 5:
          ret = 'TransportFeeding';
          break;
        case 6:
          ret = 'TransportExceptionInProgress';
          break;
        case 7:
          ret = 'TransportShuttingDown';
          break;
      }
      logMethodReturn('GetTransportStateString', arguments, ret);
      return ret;
    };
    this.GetExceptionType = function() {
      logMethodCalled('GetExceptionType', arguments);
      let ret = -1;
      try {
        ret = ExceptionData.ExceptionType;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetExceptionType', arguments, ret);
      return ret;
    };
    this.GetExceptionDevice = function() {
      logMethodCalled('GetExceptionDevice', arguments);
      let ret = -1;
      try {
        ret = ExceptionData.ExceptionDevice;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('GetExceptionDevice', arguments, ret);
      return ret;
    };
    this.GetVersion = function() {
      logMethodCalled('GetVersion', arguments);
      logMethodReturn('GetVersion', arguments, GetVersionBuffer);
      return GetVersionBuffer;
    };

    // -----End of Ranger Calls that return general buffered data------
    // -----Start of Ranger Calls that update buffered data and forward call to Ranger------
    // Note: RETURN VALUES FROM THESE CALLS WILL BE RETURNED USING THE "RangerCallStatusCallback".
    this.SetTargetLogicalPocket = function(LogicalPocketNumber) {
      logMethodCalled('SetTargetLogicalPocket', arguments);
      try {
        SendMethodRequestObj(
          'SetTargetLogicalPocket',
          'LogicalPocketNumber',
          LogicalPocketNumber
        );
        itemData.TargetLogicalPocket = LogicalPocketNumber;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetTargetLogicalPocket', arguments);
    };
    this.SetItemID = function(ID) {
      logMethodCalled('SetItemID', arguments);
      try {
        SendMethodRequestObj('SetItemID', 'ID', ID);
        itemData.ItemID = ID;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetItemID', arguments);
    };
    this.SetEncodeText = function(Text) {
      logMethodCalled('SetEncodeText', arguments);
      try {
        SendMethodRequestObj('SetEncodeText', 'Text', Text);
        itemData.EncodeText = Text;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetEncodeText', arguments);
    };
    this.SetEndorseText = function(Side, LineNumber, Text) {
      logMethodCalled('SetEndorseText', arguments);
      try {
        SendMethodRequestObj(
          'SetEndorseText',
          'Side',
          Side,
          'LineNumber',
          LineNumber,
          'Text',
          Text
        );
        itemData.EndorseText[GetSideDataString(Side)][
          `Line${LineNumber}`
        ] = Text;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetEndorseText', arguments);
    };
    this.SetFixedEndorseText = function(Side, LineNumber, Text) {
      logMethodCalled('SetFixedEndorseText', arguments);
      try {
        SendMethodRequestObj(
          'SetFixedEndorseText',
          'Side',
          Side,
          'LineNumber',
          LineNumber,
          'Text',
          Text
        );
        // Note,  Assuming there is current item information it is updated to the new endorsement but this
        // may not reflect what will be printed on the item.  Logic to determine if this is expected to affect the
        // current item has many variables.
        itemData.EndorseText[GetSideDataString(Side)][
          `Line${LineNumber}`
        ] = Text;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetFixedEndorseText', arguments);
    };
    this.SetStampNumber = function(Side, StampNumber, Position) {
      logMethodCalled('SetStampNumber', arguments);
      try {
        SendMethodRequestObj(
          'SetStampNumber',
          'Side',
          Side,
          'StampNumber',
          StampNumber,
          'Position',
          Position
        );
        itemData.StampNumber[GetSideDataString(Side)] = StampNumber;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetStampNumber', arguments);
    };
    this.SetMicrofilmText = function(Text) {
      logMethodCalled('SetMicrofilmText', arguments);
      try {
        SendMethodRequestObj('SetMicrofilmText', 'Text', Text);
        itemData.MicrofilmText = Text;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetMicrofilmText', arguments);
    };
    this.SetMicrofilmBlipType = function(BlipType) {
      logMethodCalled('SetMicrofilmBlipType', arguments);
      try {
        SendMethodRequestObj('SetMicrofilmBlipType', 'BlipType', BlipType);
        itemData.MicrofilmBlipType = BlipType;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetMicrofilmBlipType', arguments);
    };
    this.SetImageFileSetDirectory = function(SubDirectory) {
      logMethodCalled('SetImageFileSetDirectory', arguments);
      try {
        SendMethodRequestObj(
          'SetImageFileSetDirectory',
          'SubDirectory',
          SubDirectory
        );
        itemData.ImageFileSetDirectory = SubDirectory;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetImageFileSetDirectory', arguments);
    };
    this.SetImageFileSetHeaderText = function(Text) {
      logMethodCalled('SetImageFileSetHeaderText', arguments);
      try {
        SendMethodRequestObj('SetImageFileSetHeaderText', 'Text', Text);
        itemData.ImageFileSetHeaderText = Text;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetImageFileSetHeaderText', arguments);
    };
    this.SetImageFileSetName = function(Name) {
      logMethodCalled('SetImageFileSetName', arguments);
      try {
        SendMethodRequestObj('SetImageFileSetName', 'Name', Name);
        itemData.ImageFileSetName = Name;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetImageFileSetName', arguments);
    };
    this.SetImageFileSetItemText = function(Text) {
      logMethodCalled('SetImageFileSetItemText', arguments);
      try {
        SendMethodRequestObj('SetImageFileSetItemText', 'Text', Text);
        itemData.ImageFileSetItemText = Text;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetImageFileSetItemText', arguments);
    };
    this.SetItemReference = function(Value) {
      logMethodCalled('SetItemReference', arguments);
      try {
        SendMethodRequestObj('SetItemReference', 'Value', Value);
        itemData.ItemReference = Value;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetItemReference', arguments);
    };
    this.SetGenericOption = function(SectionName, ValueName, Value) {
      logMethodCalled('SetGenericOption', arguments);
      try {
        SendMethodRequestObj(
          'SetGenericOption',
          'SectionName',
          SectionName,
          'ValueName',
          ValueName,
          'Value',
          Value
        );
        GenericOptionsBuffer[SectionName][ValueName] = Value;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetGenericOption', arguments);
    };
    this.SetDriverOption = function(SectionName, ValueName, Value) {
      logMethodCalled('SetDriverOption', arguments);
      try {
        SendMethodRequestObj(
          'SetDriverOption',
          'SectionName',
          SectionName,
          'ValueName',
          ValueName,
          'Value',
          Value
        );
        DriverOptionsBuffer[SectionName][ValueName] = Value;
      } catch (err) {
        SBTConsoleLog(err);
      }
      logMethodReturn('SetDriverOption', arguments);
    };
    // -----End of Ranger Calls that update buffered data and forward call to Ranger------
  }
};
