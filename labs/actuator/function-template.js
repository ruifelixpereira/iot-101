'use strict';

var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;

var connectionString = '{iot hub connection string}';
var targetDevice = '{device id}';


function printResultFor(op) {
    return function printResult(err, res) {
      if (err) console.log(op + ' error: ' + err.toString());
      if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}


function receiveFeedback(err, receiver){
    receiver.on('message', function (msg) {
      console.log('Feedback message:')
      console.log(msg.getData().toString('utf-8'));
    });
}


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    /*
    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    */

   var serviceClient = Client.fromConnectionString(connectionString);

   try {

    await serviceClient.open();

    console.log('Service client connected');
    serviceClient.getFeedbackReceiver(receiveFeedback);

    var message = new Message('Cloud to device message: Device Command from Actuator.');
    message.ack = 'full';
    message.messageId = "My Message ID";
    console.log('Sending message: ' + message.getData());
    serviceClient.send(targetDevice, message, printResultFor('send'));
       
   } catch (error) {
        console.error('Could not connect: ' + err.message);
   }

};

