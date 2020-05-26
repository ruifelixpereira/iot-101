'use strict';

const dotenv = require('dotenv').config();
const clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
const Message = require('azure-iot-device').Message;


let client = clientFromConnectionString(process.env.IOTHUB_CONNECTION_STRING);

function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}

var connectCallback = function (err) {

    if (err) {
        console.log('Could not connect: ' + err);
    } else {
        console.log('Client connected');

        /*
        // Receive - only for cloud to device scenarios
        client.on('message', function (msg) {
            console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
            client.complete(msg, printResultFor('completed'));
        });
        */

        // Create a message and send it to the IoT Hub every second
        setInterval(function(){
            var windSpeed = 5 + (Math.random() * 7);
            var data = JSON.stringify({ deviceId: process.env.SIMULATOR_DEVICE_ID, windSpeed: windSpeed });
            var message = new Message(data);
            console.log("Sending message: " + message.getData());
            client.sendEvent(message, printResultFor('send'));
        }, 1000);
    }
};

// Start simulator
client.open(connectCallback);
